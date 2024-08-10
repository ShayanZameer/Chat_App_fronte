import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";
import ResetPassword from "./pages/ResetPassword/resetPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
