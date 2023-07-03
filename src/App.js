import React, { Component } from "react";
import Tags from "./Components/Tags";
import Main from "./Components/Main";
import Pagination from "./Components/Pagination";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      pageVisible: 1,
      pageStarts: 0,
    };
  }

  handlePage = (input) => {
    let count = this.state.pageVisible;

    if (Number.isInteger(input)) {
      count = input;
    } else if (input === "next") {
      count++;
    } else if (input === "prev") {
      count--;
    }

    if (this.state.pageVisible !== count) {
      this.setState({ pageVisible: count });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    return;
  };

  fetchArticles = (limit = 10) => {
    this.setState({ fetchedData: null });

    let query = "";

    if (this.props.match.params.query) {
      query = "tag=" + this.props.match.params.query + "&";
    }

    let offset = (this.state.pageVisible - 1) * limit;

    let url =
      "https://api.realworld.io/api/articles?" +
      query +
      "limit=" +
      limit +
      "&offset=" +
      offset;

    console.log(url, "url");

    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        console.log(arr);
        this.setState({
          fetchedData: arr.articles,
          totalPages: Math.ceil(arr.articlesCount / 10),
        });
      });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.match.params.query &&
      prevProps.match.params.query !== this.props.match.params.query
    ) {
      this.fetchArticles();
    }
  }

  render() {
    const { query } = this.props.match.params;

    return (
      <div>
        <Main
          fetchArticles={this.fetchArticles}
          pageVisible={this.state.pageVisible}
          fetchedData={this.state.fetchedData}
          query={query}
        />
        <Tags />

        {this.state.totalPages && this.state.fetchedData && (
          <Pagination
            totalPages={this.state.totalPages}
            pageVisible={this.state.pageVisible}
            fetchedData={this.state.fetchedData}
            handlePage={this.handlePage}
            pageStarts={this.state.pageStarts}
          />
        )}
      </div>
    );
  }
}

export default App;
