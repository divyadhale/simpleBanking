import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    emailId: '',
    password: '',
    address: '',
    aadharNumber: '',
    panNumber: '',
    contact: '',
  });
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);

  let timerInterval;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (formData.password !== formData.confirmPassword) {
    //   Swal.fire({
    //     title: "Passwords do not match.",
    //     timer: 2000,
    //     timerProgressBar: true,
    //     willClose: () => {
    //       clearInterval(timerInterval);
    //     }
    //   })
    //   return; 1000000000 account_number
    // }
    try {
      // setError(null);
      // setSuccess(false);
      await axios.post('http://localhost:8080/api/simple/banking/register', formData).then((resp) => {
        if (resp.status === 200) {
          // setSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            emailId: '',
            password: '',
            address: '',
            aadharNumber: '',
            panNumber: ''
          });
          Swal.fire({
            title: "Registration Successful",
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
              navigate('/login');
            }
          })
        }
        else {
          console.log("++++++++++++++++++", resp)
          // Swal.fire({
          //   title: "Registration Successful",
          //   timer: 2000,
          //   timerProgressBar: true,
          //   willClose: () => {
          //     clearInterval(timerInterval);
          //   }
          // }).then((result) => {
          //   if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
          //     navigate('/login');
          //   }
          // })
        }
      })
    } catch (error) {
      Swal.fire({
        title: "Something went wrong please try after sometime.",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
    }
  };
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleCancel = () => {
    setShowModal(true);
    setFormData({
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      address: '',
      aadharNumber: '',
      panNumber: ''
    });
  };
  const confirmCancel = () => {
    setShowModal(false);
    navigate('/');
  };
  const cancelModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="sign-up-container">
      <div className="reg-header-container header-register">
          <p className="head-text">Register for online banking</p>
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "unset",
            alignItems: "unset",
            marginTop:"10px"
          }}
        >
          <div className="form-group reg-form-group1">
            <div className="reg-label-container">
              <label htmlFor="firstName" className="reg-label">
                Please enter your First name
              </label>
            </div>
            <input
            className="RegInput"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="lastName" className="reg-label">
                Please enter your Last name
              </label>
            </div>
            <input
            className="RegInput"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="emailId" className="reg-label">
                Please enter your email
              </label>
            </div>
            <input
              className="RegInput"
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="password" className="reg-label">
                Please enter your password
              </label>
            </div>
            <input
              className="RegInput"
              type="password"
              name="password"
              // value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="address" className="reg-label">
                Please enter your address
              </label>
            </div>
            <input
              className="RegInput"
              type="text"
              name="address"
              // value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="panNumber" className="reg-label">
                Please enter your PAN card number
              </label>
            </div>
            <input
              className="RegInput"
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="aadharNumber" className="reg-label">
                Please enter your Aadhar number
              </label>
            </div>
            <input
              className="RegInput"
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="contactNo" className="reg-label">
                Please enter your contact number
              </label>
            </div>
            <input
              className="RegInput"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="reg-button-container">
          <button type="submit" className="signupbutton">Sign Up</button>
          <button type="button" onClick={handleCancel} className="cancelbutton">Cancel</button>
          </div>
        </form>

      <Modal
        isOpen={showModal}
        onRequestClose={cancelModalClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '20%',
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
        <h3 className="modal-header"><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faTriangleExclamation} />Cancel registration</h3>
        <p className="modal-p">Do you want to cancel the registration? The changes you've made will be lost. </p>
        <hr />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={confirmCancel}>Cancel Registration</button>
          <button className="continue-button" onClick={cancelModalClose}>Continue Registration</button>
        </div>
      </Modal>
    </div>
  );
}

export default SignUpForm;
