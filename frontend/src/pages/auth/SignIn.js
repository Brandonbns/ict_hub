import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/loginSlice";
function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { islogged } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    // alert(`You are login with email: ${email} and password: ${password}`);
    if (email === "user@123.com" && password === "abc123") {
      alert("Login success!");
      dispatch(login());
    } else {
      alert("Login failed!");
      dispatch(logout());
    }

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Log in</h1>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Log In</button>
      </form>
    </div>
  );
}

export default SignInForm;
