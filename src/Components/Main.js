import React, { Component } from "react";
import Card from "./Card";

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      fetching: "feed",
    };
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageVisible !== this.props.pageVisible) {
      this.props.fetchArticles();
    }

    if (this.props.query && prevProps.query !== this.props.query) {
      this.props.fetchArticles();
    }
  }

  render() {
    const { fetchedData } = this.props;

    if (!fetchedData) {
      return (
        <div className="main-container">
          <section className="post-grid">
            <div className="page">
              <Card article={null} />
            </div>
          </section>
        </div>
      );
    }

    return (
      <main className="main-container ">
        <section className="post-grid ">
          <div className="page ">
            {fetchedData.map((article) => {
              return <Card key={article.slug} article={article} />;
            })}
          </div>
        </section>
      </main>
    );
  }
}

export default Main;
