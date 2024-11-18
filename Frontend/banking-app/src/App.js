// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home";
import LoginPage from "./Components/layout/LogPage/Loginpage";
import Transactions from "./Components/Dashboard/TransactionList";
import Withdraw from "./Components/Cards/Withdraw/Withdraw";
import Profile from "./Components/Profile";
import Deposit from "./Components/layout/Main/Deposit/Deposit";
import Register from "./Components/layout/LogPage/Register";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #333;
    margin: 0;
    padding: 0;
    background-color: #f4f5f7;
  }
`;

const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposits" element={<Deposit />} />
            <Route path="/transaction-history" element={<Transactions />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Define routes for other components here... */}
            {/* Redirect to Dashboard if the path is not found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
