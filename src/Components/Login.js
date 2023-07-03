import React, { Component } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      loginUser: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      loginUser: { ...this.state.loginUser, [name]: value },
    });
  };

  render() {
    return (
      <div className="floating-window">
        <form action="" className="form flex">
          <fieldset>
            <Link className="close-icon" to="/">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h1>Log In</h1>

            <div
              className={
                this.state.loginUser.email ? "input-box active" : "input-box"
              }
            >
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleChange}
                value={this.state.loginUser.email}
                id="email"
                name="email"
                type="email"
              />
            </div>

            <div
              className={
                this.state.loginUser.password ? "input-box active" : "input-box"
              }
            >
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handleChange}
                id="password"
                value={this.state.loginUser.password}
                name="password"
                type="password"
              />
            </div>

            <footer>
              <span className="mini-nav">
                New to <span className="logo">Blogstagram?</span>
                <Link to={"/signup"} className="nav-link">
                  Create an account
                </Link>
              </span>

              <button className="join-btn">Login</button>
            </footer>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
