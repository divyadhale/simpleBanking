import React from 'react';
import styled from 'styled-components';
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";

const TransactionsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Transaction = styled.div`
 display: flex;
    justify-content: space-between;
    padding: 12px 12px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    background: rgb(234, 234, 247);
    width: 100%;
    height: 100%
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionName = styled.p`
  color: #333;
  display: flex;
  align-items: center;
`;

const TransactionAmount = styled.span`
  color: #888;
`;

const TransactionIcon = styled.p`
color: red 
`

// function renderTransCard() {
//   return (
//     <Transaction>
//       <TransactionIcon><PiHandWithdrawLight size={25} color='green' /></TransactionIcon>
//       <TransactionName>Minimal apps Jan draft</TransactionName>
//       <TransactionAmount>₹50,120</TransactionAmount>
//     </Transaction>
//   )
// }

function Transactions() {
  // const [transList, setTransList] = useState([]);

  // useEffect(() => {
  //   async function fetchTransList() {
  //     await axios.get('http://localhost:8080/api/simple/banking/history?customerId=1000000000')
  //       .then(res => {
  //         if (res.data.length) {
  //           setTransList(res.data)
  //         }
  //       })
  //   }

  //   fetchTransList();
  // }, [])

  return (
    <TransactionsContainer>
      <Transaction>
        <TransactionIcon><PiHandWithdrawLight size={25} color='green' /></TransactionIcon>
        <TransactionName>Minimal apps Jan draft</TransactionName>
        <TransactionAmount>₹50,120</TransactionAmount>
      </Transaction>
      <Transaction>
        <TransactionIcon><PiHandDepositLight size={25} /></TransactionIcon>
        <TransactionName>Mortgage Jubilee Place</TransactionName>
        <TransactionAmount>₹17,394</TransactionAmount>
      </Transaction>
      <Transaction>
        <TransactionIcon><PiHandWithdrawLight size={25} color='green' /></TransactionIcon>
        <TransactionName>Craven Hill Rent</TransactionName>
        <TransactionAmount>₹3,670</TransactionAmount>
      </Transaction>
    </TransactionsContainer>
     
  );
}

export default Transactions;
