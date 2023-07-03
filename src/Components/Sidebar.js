import React from "react";
import "./sidebar.scss";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

let topics = [
  "Gaming",
  "Sports",
  "TV",
  "Travel",
  "Health & Fitness",
  "Fashion",
  "Business",
  "Technology",
  "Beauty",
  "Lifestyle",
];

const Sidebar = () => {
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

          <li>
            <NavLink
              to="/trending"
              activeClassName="active"
              className="navlink"
            >
              <span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </span>
              Trending
            </NavLink>
          </li>
        </ul>
        <h2>Tags</h2>
        <ul>
          {topics.map((tag) => {
            return (
              <li key={tag}>
                <NavLink
                  to={"/" + tag.toLowerCase()}
                  activeClassName="active"
                  className="navlink"
                >
                  {tag}
                </NavLink>
              </li>
            );
          })}

          <li>More</li>
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
