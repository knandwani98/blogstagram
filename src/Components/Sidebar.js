import React from "react";
import "../style/sidebar.scss";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = ({ activeTag }) => {
  return (
    <aside className="side-bar">
      <nav>
        <h2>Feeds</h2>
        <ul>
          <li className="home">
            <NavLink exact className="navlink" to="/" activeClassName="active">
              <span>
                <i className="fa-solid fa-house"></i>
              </span>
              Global
            </NavLink>
          </li>
          {activeTag && (
            <li>
              <Link activeClassName="active" className="navlink active">
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
        <Link to="/signup" className="join-btn">
          Join <span className="logo">blogstagram.</span>
        </Link>
      </footer>
    </aside>
  );
};

export default Sidebar;
