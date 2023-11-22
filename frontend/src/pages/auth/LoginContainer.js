import React, { useState } from "react";
import "./auth.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

function LoginContainer() {
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
    <div className="App">
      <h2>{type === "signUp" ? "Signup" : "Login"} Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already Have and Account?</h1>
              <p>Enter your login details to jump into to our portal</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Log In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>New to our Portal?</h1>
              <p>
                Enter your personal details and signup to jump into our portal
              </p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
