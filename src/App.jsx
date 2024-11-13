import { useState } from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { SignIn } from "./components/sign-in/SignIn";
import { Register } from "./components/sign-in/Register";
import { HomePage } from "./components/home-page/HomePage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="home-page" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
