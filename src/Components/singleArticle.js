import React from "react";
import Card from "./Card";

class singleArticle extends React.Component {
  componentDidMount() {}

  render() {
    const { slug } = this.props.match.params;

    return <Card />;
  }
}

export default singleArticle;
