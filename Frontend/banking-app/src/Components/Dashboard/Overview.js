import React from 'react';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 0 20px;
`;

const AccountBalance = styled.div`
  background-color: #fff;
  padding: 20px;
  flex: 1;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const BalanceAmount = styled.h2`
  color: #333;
`;

const BalanceLabel = styled.p`
  color: #888;
`;

function Overview() {
  return (
    <OverviewContainer>
      <AccountBalance>
        <BalanceAmount>₹ 50,090</BalanceAmount>
        <BalanceLabel>Balance</BalanceLabel>
      </AccountBalance>
      <AccountBalance>
        <BalanceAmount>₹ 9,900</BalanceAmount>
        <BalanceLabel>Credit Card</BalanceLabel>
      </AccountBalance>
      <AccountBalance>
        <BalanceAmount>₹ 120,012</BalanceAmount>
        <BalanceLabel>Loan Amount</BalanceLabel>
      </AccountBalance>
      <AccountBalance>
        <BalanceAmount>₹ 0</BalanceAmount>
        <BalanceLabel>Mortgage</BalanceLabel>
      </AccountBalance>
    </OverviewContainer>
  );
}

export default Overview;
