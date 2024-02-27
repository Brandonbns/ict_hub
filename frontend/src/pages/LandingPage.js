import React from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Info from "./Info";
import Classes from "./Classes";
import Recordings from "./Recordings";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/loginSlice";
import MiniDrawer from "../components/drawer/drawer";

function LandingPage() {
  const dispatch = useDispatch();

  return (
    <div className="landingPage">
      <MiniDrawer>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/info" element={<Info />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/recordings" element={<Recordings />} />
          </Routes>
        </BrowserRouter>
      </MiniDrawer>
    </div>
  );
}

export default LandingPage;
