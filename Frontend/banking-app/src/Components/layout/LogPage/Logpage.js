import React, { useState } from "react";

import SignInForm from "./SignIn";
import NavBar1 from "../../../common/Navbar1";
import NavBar2 from "../../../common/Navbar2";
import RegulatoryFooter from "../../../common/RegulatoryFooter";
import EngagementFooter from "../../../common/EngagementFooter";

import "./styles.css";

export default function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

    return (
   
      <div style={{ background: "#fff" }}>
      <div style={{ top: "0" }}>
        <NavBar1 />
        <NavBar2 />
      </div>
      <div className="logpage">
      <div className={containerClass} id="container">
        <SignInForm />
        {/* <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info</p>
            </div>
          </div>
        </div> */}
      </div>
      </div>
      <EngagementFooter />
      <RegulatoryFooter />
    </div>
   
  );
}