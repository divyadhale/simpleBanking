import "./Account.css";

export default function Account() {
  return (
    <div className="grid-one-item grid-common grid-c1">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Main Account</h3>
        </div>
        <div className="grid-c1-content">
            <p>Account Info</p>
            <div className="lg-value">Account Number: <span>1234567890</span></div>
            <div className="lg-value">Holder Name: <span>Atanu Mondal</span></div>
            <div className="lg-value">Holder Email: <span>Atanu.Mondal@ltimindtree.com</span></div>
            <div className="lg-value">Balance: <span>$ 22,000</span></div>
        </div>
    </div>
  )
}


