import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import App from "./App";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/blogstagram">
    <Header />
    <Sidebar />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/:query" component={App} />
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
);
