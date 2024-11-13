import { useState } from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { SignIn } from "./components/sign-in/SignIn";
import { Register } from "./components/sign-in/Register";
import { HomePage } from "./components/home-page/HomePage";
import { NavBar } from "./components/navbar/NavBar";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews></ApplicationViews>
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
