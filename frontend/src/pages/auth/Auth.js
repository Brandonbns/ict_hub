import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "../LandingPage";
import LoginPage from "./LoginContainer";
import { changelogin } from "../../features/loginSlice";

function Auth() {
  const { islogged } = useSelector((state) => state.login);

  return <div>{islogged ? <LandingPage /> : <LoginPage />}</div>;
}

export default Auth;
