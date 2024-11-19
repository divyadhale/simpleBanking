import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import styled from 'styled-components';
import Modal from "react-modal";

import NavBar2 from "../../../common/Navbar2";import "./Withdraw.css";
import RegulatoryFooter from "../../../common/RegulatoryFooter";
import SideMenu from "../../Dashboard/SideMenu";

const WithdrawContainer = styled.div`
  display: flex;
  margin-top: 5.8em;
  margin-bottom: 10em;
`

export default function Withdraw() {
  const [amount, setAmount] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState(0);
  const navigate = useNavigate();
  let timerInterval;

  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    setCustomerId(customerId);
  }, [])

  const cancelModal = () => {
    setShowModal(false);
  };

  const handleOTPchange = (e) => {
    let value = e.target.value.trim();
    if (value)
      setReceivedOtp(value);
  }

  const handleTransaction = async () => {
    try {
      await axios.post("http://localhost:8080/api/simple/banking/doTransaction", {
        customerId: customerId,
        code: receivedOtp
      }).then((resp) => {
        if (resp) {
          Swal.fire({
            title: "Deposit Successful",
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
              navigate('/dashboard');
            }
          })
        }
      })
    } catch (error) {

    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      Swal.fire({
        title: "Please Enter a Valid Amount",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/simple/banking/withdraw?customerId=${JSON.parse(customerId)}&amount=${amount}`).then((resp) => {
        Swal.fire({
          title: "OTP sent to your registered email id",
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
            setShowModal(true);
          }
        })
      })
      // if (response.data !== "Insufficient Balance") {
      //   Swal.fire({
      //     title: "Withdraw Successful",
      //     timer: 2000,
      //     timerProgressBar: true,
      //     willClose: () => {
      //       clearInterval(timerInterval);
      //     }
      //   }).then((result) => {
      //     if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
      //       navigate('/home');
      //     }
      //   })
      // }
      // else {
      //   Swal.fire({
      //     title: "Insufficient Balance",
      //     timer: 2000,
      //     timerProgressBar: true,
      //     willClose: () => {
      //       clearInterval(timerInterval);
      //     }
      //   })
      // }
    } catch (err) {
      console.log('Error during transaction: ', err);
    }
  }

  return (
    <>
      <div style={{ "position": "fixed", "top": "0", "zIndex": "3" }}>
        <NavBar2 />
      </div>
      <WithdrawContainer>
        <SideMenu />
        <div className='main-content'>
          <div className="grid-c1-content">
            <p className="lg-value"> Customer Id: {JSON.parse(customerId)}</p>
            <input className="amt-inp" type="number" placeholder="enter amount" onChange={(e) => { setAmount(e.target.value) }}></input>
            <br></br>
            <button type="sumbit" onClick={handleOnSubmit} className="submit-btn">Submit</button>
          </div>
        </div>
      </WithdrawContainer>
      <RegulatoryFooter />
      <Modal
        isOpen={showModal}
        onRequestClose={cancelModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '450px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            textAlign: 'left'
          }
        }}
      >
        <h3 className="modal-header spacing">2-Step Verification</h3>
        <p className="modal-p">Pleaes enter the OTP send to your email id.</p>
        <input type="number" className="otp-inp" onChange={(e) => handleOTPchange(e)} />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={cancelModal}>Cancel</button>
          <button className="continue-button" onClick={handleTransaction}>Continue</button>
        </div>
      </Modal>
    </>
  )
}