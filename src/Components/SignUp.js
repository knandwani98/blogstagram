import React, { Component } from "react";
import "./form.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class SignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      signupUser: {
        username: "",
        email: "",
        password: "",
        errors: {
          username: "",
          email: "",
          password: "",
        },
      },
    };
  }

  handleErrors = () => {
    let errors = this.state.errors;

    console.log(errors);
    if (!this.state.username) {
      errors.username = "Username should not be empty";
    }

    this.setState({ errors });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      signupUser: { ...this.state.signupUser, [name]: value },
    });
  };

  render() {
    return (
      <div className="floating-window">
        <form action="" className="form flex">
          <fieldset>
            <Link className="close-icon" to="/">
              <i className="fa-solid fa-xmark"></i>
            </Link>{" "}
            <h1>Sign Up</h1>
            <div
              className={
                this.state.signupUser.username
                  ? "input-box active"
                  : "input-box"
              }
            >
              <label htmlFor="username">Username*</label>
              <input
                onChange={this.handleChange}
                value={this.state.signupUser.username}
                id="username"
                name="username"
                type="text"
              />
              {/* <p>{this.state.errors.username}</p> */}
            </div>
            <div
              className={
                this.state.signupUser.email ? "input-box active" : "input-box"
              }
            >
              <label htmlFor="email">Email*</label>
              <input
                onChange={this.handleChange}
                value={this.state.signupUser.email}
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div
              className={
                this.state.signupUser.password
                  ? "input-box active"
                  : "input-box"
              }
            >
              <label htmlFor="password">Password*</label>
              <input
                onChange={this.handleChange}
                id="password"
                value={this.state.signupUser.password}
                name="password"
                type="password"
              />
            </div>
            <footer>
              <span className="mini-nav">
                Already a <span className="logo">Blogstagramer?</span>
                <Link to={"/login"} className="nav-link">
                  Log In
                </Link>
              </span>

              <button
                disabled={!this.state.errorMsgs ? true : false}
                className="join-btn"
              >
                Sign Up
              </button>
            </footer>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SignUp;
