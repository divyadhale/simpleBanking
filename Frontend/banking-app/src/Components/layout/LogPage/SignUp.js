import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import InputField from "./InputField";

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    address: '',
    aadharNumber: '',
    panNumber: '',
    contact: '',
  });
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [validM, setvalidM] = useState({});
  let timerInterval;
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const validMessages = { ...validM };
    // First Name
    if (name === "firstName") {
      if (!value.trim()) {
        newErrors.firstName = "First name is required.";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors.firstName = "First name must contain only letters.";
      } else {
        delete newErrors.firstName;
        validMessages.firstName = "First name is valid.";
      }
    }
    // Last Name
    if (name === "lastName") {
      if (!value.trim()) {
        newErrors.lastName = "Last name is required.";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors.lastName = "Last name must contain only letters.";
      } else {
        delete newErrors.lastName;
        validMessages.lastName = "Last name is valid.";
      }
    }
    // Email
    if (name === "emailId") {
      if (!value.trim()) {
        newErrors.emailId = "Email is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        newErrors.emailId = "Invalid email format.";
      } else {
        delete newErrors.emailId;
        validMessages.emailId = "Email is valid.";
      }
    }
    // Password
    if (name === "password") {
      if (!value.trim()) {
        newErrors.password = "Password is required.";
      } else if (value.length < 7 || value.length > 15) {
        newErrors.password = "Password must be 7-15 characters long.";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{7,15}$/.test(value)) {
        newErrors.password =
          "Password must contain at least one letter, one number, and only allowed special characters @$!%*?&.";
      } else {
        delete newErrors.password;
        validMessages.password = "Password is valid.";
      }
    }
    // Address
    if (name === "address") {
      if (!value.trim()) {
        newErrors.address = "Address is required.";
      } else if (value.length < 5) {
        newErrors.address = "Address must be at least 5 characters long.";
      } else {
        delete newErrors.address;
        validMessages.address = "Address is valid.";
      }
    }
    // PAN Card
    if (name === "panNumber") {
      if (!value.trim()) {
        newErrors.panNumber = "PAN number is required.";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
        newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F).";
      } else {
        delete newErrors.panNumber;
        validMessages.panNumber = "PAN number is valid.";
      }
    }
    // Aadhaar Card
    if (name === "aadharNumber") {
      if (!value.trim()) {
        newErrors.aadharNumber = "Aadhaar number is required.";
      } else if (!/^\d{12}$/.test(value)) {
        newErrors.aadharNumber = "Aadhaar number must be a 12-digit number.";
      } else {
        delete newErrors.aadharNumber;
        validMessages.aadharNumber = "Aadhaar number is valid.";
      }
    }
    // Contact Number
    if (name === "contact") {
      if (!value.trim()) {
        newErrors.contact = "Contact number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        newErrors.contact = "Contact number must be a 10-digit number.";
      } else {
        delete newErrors.contact;
        validMessages.contact = "Contact number is valid.";
      }
    }
    setErrors(newErrors);
    setvalidM(validMessages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "panNumber" ? value.toUpperCase() : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue
    }));
    validateField(name, updatedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field], newErrors);
    });
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
    if (Object.keys(newErrors).length === 0) {
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
          title: error.response.data.message,
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
      }

    }
    else {
      setErrors(newErrors);
      Swal.fire({
        title: "Please fix the errors before submitting" ,
        timer: 2000,
        timerProgressBar: true,
      });
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
          marginTop: "10px"
        }}
      >
        {/* First Name */}
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          validationMessage={errors.firstName}
        />
        {/* Last Name */}
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          validationMessage={errors.lastName}
        />
        {/* Email */}
        <InputField
          label="Email ID"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleChange}
          error={errors.emailId}
          validationMessage={errors.emailId}
        />
        {/* Password */}
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          validationMessage={errors.password}
        />
        {/* Address */}
        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          validationMessage={errors.address}
        />
        {/* Contact Number */}
        <InputField
          label="Contact Number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          error={errors.contact}
          validationMessage={errors.contact}
        />

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