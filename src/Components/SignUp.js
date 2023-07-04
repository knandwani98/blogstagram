import React, { Component } from "react";
import "../style/form.scss";
import validateForm from "../Utility/validateForm";
import { baseUrl } from "../Utility/constants";
import Loader from "./Loader";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

class SignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
      signingUp: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    let errors = { ...this.state.errors };

    validateForm(errors, name, value);

    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.signup();
  };

  signup = () => {
    this.setState({ signingUp: true });
    const { username, email, password } = this.state;

    fetch(baseUrl + "/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          this.setState({
            errors: {
              ...this.state.errors,
              email: data.errors.email,
              username: data.errors.username,
              password: data.errors.password,
            },
          });
          return;
        }
        if (data.user) {
          this.setState({
            signedUser: data.user,
          });
          // console.log("Signed Up");
        }
        return;
      })
      .then(() => {
        this.setState({
          signingUp: false,
        });
      });
  };

  render() {
    const { username, email, password, errors, signedUser } = this.state;

    if (signedUser) {
      return <Redirect to={{ pathname: "/login", state: signedUser }} />;
    }

    return (
      <div className="floating-window">
        <form action="" onSubmit={this.handleSubmit} className="form flex">
          <fieldset>
            <Link className="close-icon" to="/">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h1>Sign Up</h1>
            <div className={username ? "input-box active" : "input-box"}>
              <label htmlFor="username">Username*</label>
              <input
                onChange={this.handleChange}
                value={username}
                id="username"
                name="username"
                type="text"
              />
              <span className="error-msg">{errors.username}</span>
            </div>
            <div className={email ? "input-box active" : "input-box"}>
              <label htmlFor="email">Email*</label>
              <input
                onChange={this.handleChange}
                value={email}
                id="email"
                name="email"
                type="email"
              />
              <span className="error-msg">{errors.email}</span>
            </div>
            <div className={password ? "input-box active" : "input-box"}>
              <label htmlFor="password">Password*</label>
              <input
                onChange={this.handleChange}
                id="password"
                value={password}
                name="password"
                type="password"
              />
              <span className="error-msg">{errors.password}</span>
            </div>
            <footer>
              <span className="mini-nav">
                Already a <span className="logo">Blogstagramer?</span>
                <Link to={"/login"} className="nav-link">
                  Log In
                </Link>
              </span>

              <button
                disabled={errors.username || errors.email || errors.password}
                className="join-btn"
              >
                {this.state.signingUp ? <Loader /> : "Sign Up"}
              </button>
            </footer>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SignUp;
