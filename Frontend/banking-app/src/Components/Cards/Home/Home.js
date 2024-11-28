import { useEffect, useState } from "react";
import axios from 'axios';

import "./Home.css";

export default function Home() {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const accnumber = token ? atob(token) : undefined;
        const response = await axios.get(`http://localhost:8080/api/simple/banking/balance/${JSON.parse(accnumber)}`);
        setBalance(response.data)
      } catch (err) {
        console.log('Error during login:');
      }
    }
    fetchData();
  })

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Main Account</h3>
      </div>
      <div className="grid-c1-content">
        <p>Balance</p>
        <div className="lg-value">₹ {balance}</div>
      </div>
    </div>
  )
}