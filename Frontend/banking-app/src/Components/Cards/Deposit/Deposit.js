import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

// import "./Deposit.css";

export default function Deposit() {
  const [amount, setAmount] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  let timerInterval;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerId = token ? atob(token) : undefined;
    setCustomerId(customerId);
  }, []);

  const cancelModal = () => {
    setShowModal(false);
  };

  const handleOTPchange = (e) => {
    let value = e.target.value.trim();
    if (value) setReceivedOtp(value);
  };

  const handleTransaction = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8080/api/simple/banking/doTransaction", {
        customerId: JSON.parse(customerId),
        code: receivedOtp,
      });
      Swal.fire({
        title: "Deposit Successful",
        timer: 2000,
        timerProgressBar: true,
        icon:"success"
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      if(error.response && error.response.data){
        const errorMessage= error.response.data;
        if(errorMessage==="Incorrect OTP"){
          Swal.fire({
            title: "Incorrect OTP",
            text: "Please enter correct OTP again.",
            timer: 2000,
            timerProgressBar: true,
            icon:"error",
          });
        }else if(errorMessage==="Otp Expired.Please try again"){
          Swal.fire({
            title: "OTP Expired",
            text: "Please try again.",
            timer: 2000,
            timerProgressBar: true,
            icon:"error",
          });
          cancelModal();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      Swal.fire({
        title: "Please enter a valid amount",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
      return;
    }
    try {
      setIsLoading(true);
      await axios
        .post(
          `http://localhost:8080/api/simple/banking/deposit?customerId=${JSON.parse(
            customerId
          )}&amount=${amount}`
        )
        .then((resp) => {
          Swal.fire({
            title: "OTP sent to your registered email id",
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (
              result.dismiss === Swal.DismissReason.timer ||
              result.isConfirmed
            ) {
              setShowModal(true);
            }
          });
        });
    } catch (err) {
      console.log("Error during transaction: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px"
          }}
        >
          <ClipLoader color="red" size={50} />
          Loading...
        </div>
      )}
      <div className="grid-c1-content">
        <p className="lg-value"> Customer Id: {JSON.parse(customerId)}</p>
        <input
          className="amt-inp"
          type="number"
          placeholder="enter amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></input>
        <br></br>
        <button type="sumbit" onClick={handleOnSubmit} className="submit-btn">
          Submit
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={cancelModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "450px",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            textAlign: "left"
          }
        }}
      >
        <h3 className="modal-header spacing">2-Step Verification</h3>
        <p className="modal-p">Pleaes enter the OTP send to your email id.</p>
        <input
          type="number"
          className="otp-inp"
          onChange={(e) => handleOTPchange(e)}
        />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={cancelModal}>
            Cancel
          </button>
          <button className="continue-button" onClick={handleTransaction}>
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
}
