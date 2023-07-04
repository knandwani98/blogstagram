import React, { Component } from "react";
import "../style/form.scss";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import validateForm from "../Utility/validateForm";
import { baseUrl } from "../Utility/constants";
import Loader from "./Loader";

class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
      logingIn: false,
    };
  }

  setLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify([value]));
  };

  login = () => {
    this.setState({ logingIn: true });
    const { email, password } = this.state;

    fetch(baseUrl + "/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          this.setState({
            errors: { password: "Email or Password is invalid" },
          });
          return;
        }
        if (data.user) {
          this.setLocalStorage("loggedInUser", data.user);
          return;
        }
        return;
      })
      .then(() => {
        this.setState({
          logingIn: false,
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.login();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    let errors = { ...this.state.errors };

    validateForm(errors, name, value);

    this.setState({
      [name]: value,
      errors,
    });
  };

  render() {
    const { email, password, errors } = this.state;
    const { loggedInUser } = localStorage;

    if (loggedInUser) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="floating-window">
        <form action="" onSubmit={this.handleSubmit} className="form flex">
          <fieldset>
            <Link className="close-icon" to="/">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h1>Log In</h1>

            <div className={email ? "input-box active" : "input-box"}>
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
                New to <span className="logo">Blogstagram?</span>
                <Link to={"/signup"} className="nav-link">
                  Create an account
                </Link>
              </span>

              <button
                disabled={errors.username || errors.email || errors.password}
                className="join-btn"
              >
                {this.state.logingIn ? <Loader /> : "Login"}
              </button>
            </footer>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
