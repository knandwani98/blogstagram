import React from "react";
import "./card.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "./Loader";

const Card = ({ article }) => {
  if (!article) {
    return <Loader />;
  }

  return (
    <div className="card">
      <header>
        <div className="flex">
          <div className="flex">
            <img className="avatar" src={article.author.image} alt="" />
            <h3 className="username">{article.author.username}</h3>
          </div>

          <div className="follow">
            <div className="follow-btn"></div>
          </div>
        </div>
      </header>

      <main>
        <Link className="title" to={"/articles/" + article.slug}>
          {article.title}
        </Link>
        <p>{article.description}</p>

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
  );
};

export default Card;
