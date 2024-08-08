import React from "react";
import { Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";

const App = () => {
  return (
    <div>
      <Route path="/" component={Login} exact />
      <Route path="/signup" component={Signup} />

      <Route path="/forgot-password" component={ForgotPassword} />

      <Route path="/chats" component={Chat} />
    </div>
  );
};

export default App;
