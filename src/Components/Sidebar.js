import React from "react";
import "../style/sidebar.scss";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

class Sidebar extends React.Component {
  state = {
    loggedInUser: null,
  };

  componentDidMount() {
    if (localStorage.loggedInUser) {
      let activeUser = JSON.parse(localStorage.getItem("loggedInUser"))[0];
      // console.log(activeUser);
      this.setState({
        loggedInUser: activeUser,
      });
    }
  }

  render() {
    const { activeTag } = this.props;
    const { loggedInUser } = this.state;

    return (
      <aside className="side-bar">
        <nav>
          <h2>Feeds</h2>
          <ul>
            <li className="home">
              <NavLink
                exact
                className="navlink"
                to="/"
                activeClassName="active"
              >
                <span>
                  <i className="fa-solid fa-house"></i>
                </span>
                Global
              </NavLink>
            </li>
            {activeTag && (
              <li>
                <Link className="navlink active">
                  <span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                  #{activeTag}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <footer className="center">
          {loggedInUser ? (
            <Link to="/" className="join-btn">
              <span className="logo">
                <i className="fa-solid fa-user"></i>
              </span>
              {this.state.loggedInUser.username}
            </Link>
          ) : (
            <Link to="/signup" className="join-btn">
              Join <span className="logo">blogstagram.</span>
            </Link>
          )}
        </footer>
      </aside>
    );
  }
}

export default Sidebar;
