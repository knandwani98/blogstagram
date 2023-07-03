import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "../style/header.scss";

const Header = () => {
  return (
    <header className="main-header">
      <div className="container flex">
        <Link to="/" className="logo">
          blogstagram.
        </Link>
        <div className="search-bar">
          <span className="search-icon flex">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <span className="close-icon flex">
            <i className="fa-solid fa-circle-xmark"></i>
          </span>
          <input type="search" name="search" placeholder="Search Blogstagram" />
        </div>
        <Link to="/login" className="login-btn">
          Log In
        </Link>
      </div>
    </header>
  );
};

export default Header;
