import React, { Component } from "react";
import Tags from "./Components/Tags";
import Main from "./Components/Main";
import Pagination from "./Components/Pagination";
import Sidebar from "./Components/Sidebar";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      pageVisible: 1,
      pageStarts: 0,
      activeTag: "",
    };
  }

  getActiveTag = (activeTag) => {
    this.setState({ activeTag });
  };

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

    let tagQuery = this.props.match.params.tag + "&";
    let slugQuery = this.props.match.params.slug + "&";

    let offset = (this.state.pageVisible - 1) * limit;

    let url =
      "https://api.realworld.io/api/articles?" +
      (tagQuery ? "tag=" + tagQuery + "&" : "") +
      (slugQuery ? "article=" + slugQuery + "&" : "") +
      "limit=" +
      limit +
      "&offset=" +
      offset;

    console.log(url, "url");

    this.props.match.params.tag &&
      this.getActiveTag(this.props.match.params.tag);

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
      !this.props.match.params.tag &&
      prevProps.match.params.tag !== this.props.match.params.tag
    ) {
      this.setState({ activeTag: "" });
      this.fetchArticles();
    }
  }

  render() {
    const { tag } = this.props.match.params;

    return (
      <div>
        <Sidebar activeTag={this.state.activeTag} />

        <Main
          fetchArticles={this.fetchArticles}
          pageVisible={this.state.pageVisible}
          fetchedData={this.state.fetchedData}
          tag={tag}
        />
        <Tags getActiveTag={this.getActiveTag} />

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
