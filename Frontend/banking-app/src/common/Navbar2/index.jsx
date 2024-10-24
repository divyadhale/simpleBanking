import { useState } from "react";
import "./index.css"

function NavBar2() {
  const [hoverContent, setHoverContent] = useState('');

  const contentMap = {
    "banking": {}
  }

  return (
    <>
      <div className="navbar2-main">
        <div className="pointer"></div>
        <div className="logo-container">
          <img className="hsbc-full-logo" src={process.env.PUBLIC_URL + '/hsbc_logo_full_rs.png'} alt="hsbc_logo" />
        </div>
        <div className="feature-container">
          <div className="navbar2-option navbar2-right-separator">
            <div>Banking</div>
            <div className="preview-desc">Cards & Account</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>Borrowing</div>
            <div className="preview-desc">Home & Personal Loans</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>Investing</div>
            <div className="preview-desc">Wealth & Insurance</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>NRI</div>
            <div className="preview-desc">NRI services & Transfer</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>Offers</div>
            <div className="preview-desc">Offers & Rewards</div>
          </div>
          <div className="navbar2-option">
            <div>Online Banking</div>
            <div className="preview-desc">Banking made easy</div>
          </div>
        </div>
      </div>

      {/* For banking */}
      {/* <div className="navBar2-hover-main">

        <div className="navbar2-hover-section">
          <div className="navbar2-hover-sub-section">
            <div className="navbar2-hover-header">Credit Cards</div>
            <div>Live+ Card</div>
            <div>Visa Platinum Card</div>
            <div>Compare cards</div>
            <div>View all cards</div>
          </div>
          <div className="navbar2-hover-sub-section">
            <div className="navbar2-hover-header">Credit Cards Features</div>
            <div>Google Pay</div>
            <div>e-Mandate</div>
            <div>Instant EMI</div>
            <div>Cash On EMI</div>
            <div>Loan On Phone</div>
            <div>Balance Conversion</div>
            <div>Fuel Surcharge</div>
            <div>Secure Online Payments</div>
            <div>Online Banking</div>
            <div>Balance Transfer</div>
          </div>
        </div>

        <div className="navbar2-hover-section">
          <div className="navbar2-hover-sub-section">
            <div className="navbar2-hover-header">Bank Accounts</div>
            <div>Savings Account</div>
            <div>Fixed Deposit</div>
            <div>Smart Money</div>
            <div>Basic Savings Account</div>
            <div>Demat Account</div>
            <div>Debit Card</div>
            <div>Employee Banking Solutions</div>
            <div>Mariner's Account</div>
          </div>
          <div className="navbar2-hover-sub-section">
            <div className="navbar2-hover-header">Personal Banking</div>
            <div>Personal Banking</div>
          </div>
          <div className="navbar2-hover-sub-section">
            <div className="navbar2-hover-header">International Payment and Transfers</div>
            <div>Global Money Transfers</div>
            <div>Worldwide banking</div>
            <div>Liberalised Remittances Scheme</div>
          </div>
        </div>

        <div></div>

        <div></div>
      </div> */}
    </>
  )
}

export default NavBar2;
