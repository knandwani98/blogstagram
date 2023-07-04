import React, { Component } from "react";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "./Loader";
import "../style/tags.scss";

class Tags extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  fetchtags = (limit = 1000) => {
    let url = "https://api.realworld.io/api/articles?limit=" + limit;
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        data.articles.reduce((acc, cv) => {
          cv.tagList.filter((tag) => (!acc.includes(tag) ? acc.push(tag) : ""));
          return acc;
        }, [])
      )
      .then((tags) => this.setState({ tags }));
  };

  componentDidMount() {
    this.fetchtags();
  }

  render() {
    const { tags } = this.state;

    if (!tags) {
      return (
        <div className="tags-container center">
          <Loader />
        </div>
      );
    }

    return (
      <div className="tags-container top-margin">
        <h2>
          <span>
            <i className="fa-solid fa-hashtag"></i>
          </span>
          Recent tags
        </h2>

        <div className="tags flex wrap">
          {tags.map((tag) => {
            return (
              <NavLink
                key={tag}
                className="navlink"
                activeClassName={"active"}
                to={"/articles/tag/" + tag}
              >
                {tag}
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tags;
