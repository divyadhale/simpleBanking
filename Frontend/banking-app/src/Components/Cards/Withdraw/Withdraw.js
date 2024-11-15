import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

import "./Withdraw.css";
import NavBar1 from "../../../common/Navbar1";
import NavBar2 from "../../../common/Navbar2";
import RegulatoryFooter from "../../../common/RegulatoryFooter";
import SideMenu from "../../Dashboard/SideMenu";

export default function Withdraw() {
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
      const response = await axios.post(`http://localhost:8080/api/simple/banking/withdraw?accNumber=${JSON.parse(accountId)}&amount=${amount}`);
      if (response.data !== "Insufficient Balance") {
        Swal.fire({
          title: "Withdraw Successful",
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
      else {
        Swal.fire({
          title: "Insufficient Balance",
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
      }
    } catch (err) {
    }
  }

  return (
    <>
    <div style={{ "position": "fixed", "top": "0", "zIndex": "3" }}>
        <NavBar1 />
        <NavBar2 />
      </div>
      <div className="grid-one-item grid-common grid-c1">
        <SideMenu />
        <div className="grid-c-title">
          <h3 className="grid-c-title-text">Main Account</h3>
        </div>
        <div className="grid-c1-content">
          <p>Withdraw</p>
          <p className="lg-value"> Account: {JSON.parse(accountId)}</p>
          <input className="lg-value" type="number" placeholder="Enter Amount" onChange={(e) => { setAmount(e.target.value) }}></input>
          <br></br>
          <button type="sumbit" onClick={handleOnSubmit} className="submit-btn">Submit</button>
        </div>
      </div>
      <RegulatoryFooter />
    </>
  )
}