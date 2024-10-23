import React, { useState } from "react";

import SignInForm from "./SignIn";

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
    <div className="logpage">
      <h2>Green Bank</h2>
      <div className={containerClass} id="container">
        <SignInForm />
        <div className="overlay-container">
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
        </div>
      </div>
    </div>
  );
}