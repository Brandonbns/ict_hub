import React from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Info from "./Info";
import Classes from "./Classes";
import Recordings from "./Recordings";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/loginSlice";

function LandingPage() {
  const dispatch = useDispatch();

  return (
    <div className="landingPage">
      <button onClick={() => dispatch(logout())}>Logout </button>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/recordings" element={<Recordings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default LandingPage;
