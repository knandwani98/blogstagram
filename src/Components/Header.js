import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "../style/header.scss";

class Header extends React.Component {
  state = {
    loggedInUser: false,
  };

  logOut = (key) => {
    localStorage.removeItem(key);
    this.setState({ loggedInUser: false });
  };

  componentDidMount() {
    if (localStorage.loggedInUser) {
      this.setState({ loggedInUser: true });
    }
  }

  componentDidUpdate(_preProps, preState) {
    if (preState.loggedInUser && !this.state.loggedInUser) {
      this.setState({
        loggedInUser: true,
      });
    }
  }

  render() {
    const { loggedInUser } = this.state;

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
            <input
              type="search"
              name="search"
              placeholder="Search Blogstagram"
            />
          </div>

          {loggedInUser ? (
            <Link to="/" className="login-btn">
              <button onClick={() => this.logOut("loggedInUser")}>
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login" className="login-btn">
              <button>Login</button>
            </Link>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
