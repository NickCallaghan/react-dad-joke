import React, { Component } from "react";
import "./Vote.scss";

export default class Vote extends Component {
  handleVote = voteAdjustment => {
    this.props.voteOnJoke(this.props.jokeId, voteAdjustment);
  };

  render() {
    return (
      <div className="vote">
        <div className="vote-down" onClick={() => this.handleVote(-1)}>
          -
        </div>
        <div className="vote-count">{this.props.votes}</div>
        <div className="vote-up" onClick={() => this.handleVote(1)}>
          +
        </div>
      </div>
    );
  }
}
