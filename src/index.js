import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.scss";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Components/Header";
import App from "./App";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import SingleArticle from "./Components/SingleArticle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/blogstagram">
    <Header />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/articles/tag/:tag" component={App} />
      <Route exact path="/articles/:slug" component={SingleArticle} />
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
);
