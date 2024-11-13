import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/sign-in/SignIn";
import { Register } from "./components/sign-in/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
