import React, { Component } from "react";
import Vote from "./Vote";
import "./Joke.scss";

export default class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <Vote
          jokeId={this.props.joke.id}
          voteOnJoke={this.props.voteOnJoke}
          votes={this.props.joke.votes}
        />
        <div className="Joke-text">{this.props.joke.joke}</div>
      </div>
    );
  }
}
