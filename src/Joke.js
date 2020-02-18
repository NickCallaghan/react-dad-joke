import React, { Component } from "react";
import Vote from "./Vote";
import "./Joke.scss";

export default class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <Vote />
        <div className="Joke-text">{this.props.joke.joke}</div>
      </div>
    );
  }
}
