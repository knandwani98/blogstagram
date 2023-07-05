import React from "react";
import { articlesUrl } from "../Utility/constants";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Header from "./Header";

class SingleArticle extends React.Component {
  state = {
    article: null,
  };

  componentDidMount() {
    const { slug } = this.props.match.params;

    console.log(slug);

    fetch(articlesUrl + "/" + slug)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          article: data.article,
        });
      });
  }

  render() {
    const { article } = this.state;
    const { getActiveTag } = this.props;

    if (!article) {
      return (
        <div className="tags-container center">
          <Loader />
        </div>
      );
    }

    return (
      <div>
        <Header />

        <main>
          <Sidebar activeTag={this.state.activeTag} />

          <div className="single-article">
            <div className="card">
              <header>
                <div className="flex">
                  <div className="flex">
                    <img className="avatar" src={article.author.image} alt="" />
                    <h3 className="username">{article.author.username}</h3>
                  </div>

                  <div className="follow">
                    <button
                      className={
                        !article.author.following
                          ? "follow-btn"
                          : "follow-btn following"
                      }
                    >
                      {!article.author.following ? "follow" : "following"}
                    </button>
                  </div>
                </div>
              </header>

              <main>
                <h3> {article.title}</h3>
                <h2> {article.body}</h2>

                <p>{article.description}</p>

                <div className="tags flex wrap">
                  {article.tagList.map((tag) => {
                    return (
                      <NavLink
                        onClick={() => getActiveTag(tag)}
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

                <span className="date"> {article.createdAt}</span>
              </main>

              <footer>
                <div className="footer flex">
                  <div className="like flex">
                    <i
                      className={
                        article.favorited
                          ? "fa-solid fa-heart active"
                          : "fa-solid fa-heart"
                      }
                    ></i>
                    {article.favoritesCount} Likes
                  </div>

                  <div className="comment flex">
                    <i className="fa-solid fa-comment"></i>
                    Comment
                  </div>

                  <div className="share flex">
                    <i className="fa-solid fa-share"></i>
                    Share
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default SingleArticle;
