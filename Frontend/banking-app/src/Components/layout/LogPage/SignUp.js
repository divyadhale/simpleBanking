import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadharNo: '',
    panNo: '',
    contact: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Passwords do not match.",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
      return;
    }
    try {
      setError(null);
      setSuccess(false);
      const response = await axios.post('http://localhost:8080/api/simple/banking/register', formData);
      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          aadharNo: '',
          panNo: ''
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
            navigate('/home');
          }
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Registration failed.",
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      aadharNo: '',
      panNo: ''
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
              <label htmlFor="email" className="reg-label">
                Please enter your full name
              </label>
            </div>
            <input
            className="RegInput"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="email" className="reg-label">
                Please enter your email
              </label>
            </div>
            <input
              className="RegInput"
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="confirmpassword" className="reg-label">
                Please confirm your password
              </label>
            </div>
            <input
              className="RegInput"
              type="password"
              name="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="panno" className="reg-label">
                Please enter your PAN card number
              </label>
            </div>
            <input
              className="RegInput"
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group reg-form-group2">
            <div className="reg-label-container">
              <label htmlFor="aadharNo" className="reg-label">
                Please enter your Aadhar number
              </label>
            </div>
            <input
              className="RegInput"
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
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
