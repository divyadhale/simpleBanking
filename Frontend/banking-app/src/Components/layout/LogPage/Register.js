import React from "react";

import NavBar1 from "../../../common/Navbar1";
import NavBar2 from "../../../common/Navbar2";
import RegulatoryFooter from "../../../common/RegulatoryFooter";
import EngagementFooter from "../../../common/EngagementFooter";
import SignUpForm from "./SignUp";
import "./styles.css";

function Register() {
  return (
    <div className="reg-page">
      <NavBar1 />
      <NavBar2 />
      <div className="reg-form-container">
        <SignUpForm />
      </div>
      <EngagementFooter />
      <RegulatoryFooter />
    </div>
  );
}
export default Register;