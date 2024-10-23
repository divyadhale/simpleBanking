import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let timerInterval;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/simple/banking/login', {
        email,
        password,
      });
      if (response.data.statusCode === 200) {
        localStorage.setItem('accountNumber', JSON.stringify(response.data.accountNumber));
        Swal.fire({
          title: "Login Successful",
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
    } catch (err) {
      Swal.fire({
        title: "Invalid Credentials : Please check you email and password",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="headlog">Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <button className="checkbutton">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
