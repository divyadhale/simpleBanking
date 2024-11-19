import React from "react";

import SignInForm from "./SignIn";
import NavBar1 from "../../../common/Navbar1";
import NavBar2 from "../../../common/Navbar2";
import RegulatoryFooter from "../../../common/RegulatoryFooter";
import EngagementFooter from "../../../common/EngagementFooter";

import "./styles.css";

export default function LoginPage() {
  // const [type, setType] = useState("signIn");

  // const handleOnClick = (text) => {
  //   if (text !== type) {
  //     setType(text);
  //     return;
  //   }
  // };

  // const containerClass =
  //   "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div style={{ background: "#fff" }}>
      <div style={{ top: "0" }}>
        <NavBar1 />
        <NavBar2 />
      </div>
      <div className="logpage">
        <div className="container">
          <SignInForm />
        </div>
      </div>
      <EngagementFooter />
      <RegulatoryFooter />
    </div>

  );
}