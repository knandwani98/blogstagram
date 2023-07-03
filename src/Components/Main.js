import React, { Component } from "react";
import Card from "../Components/Card";

class Main extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageVisible !== this.props.pageVisible) {
      this.props.fetchArticles();
    }

    if (this.props.tag && prevProps.tag !== this.props.tag) {
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
