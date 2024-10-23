import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

import "./Deposit.css";

export default function Deposit() {
  const [amount, setAmount] = useState(0);
  const [accountId, setAccountId] = useState(0);
  const navigate = useNavigate();
  let timerInterval;

  useEffect(() => {
    const accnumber = localStorage.getItem('accountNumber');
    setAccountId(accnumber);
  }, [])

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
      await axios.post(`http://localhost:8080/api/simple/banking/deposit?accNumber=${JSON.parse(accountId)}&amount=${amount}`);
      Swal.fire({
        title: "Deposit Successful",
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
    } catch (err) {
      console.log('Error during login:');
    }
  }

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Main Account</h3>
      </div>
      <div className="grid-c1-content">
        <p>Deposit</p>
        <p className="lg-value"> Account: {JSON.parse(accountId)}</p>
        <input className="lg-value" type="number" placeholder="Enter Amount" onChange={(e) => { setAmount(e.target.value) }}></input>
        <br></br>
        <button type="sumbit" onClick={handleOnSubmit} className="submit-btn">Submit</button>
      </div>
    </div>
  )
}