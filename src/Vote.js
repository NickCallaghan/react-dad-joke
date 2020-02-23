import React, { Component } from "react";
import "./Vote.scss";

export default class Vote extends Component {
  getColor = () => {
    let bColor = "#F0D58B";
    if (this.props.votes > 6) {
      bColor = "#96FFA3";
    }
    if (this.props.votes < 0) {
      bColor = "#F0594E";
    }
    return { borderColor: bColor };
  };

  handleVote = voteAdjustment => {
    this.props.voteOnJoke(this.props.jokeId, voteAdjustment);
  };

  componentDidMount() {}

  render() {
    return (
      <div className="vote">
        <div className="vote-down" onClick={() => this.handleVote(-1)}>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="vote-count" style={this.getColor()}>
          {this.props.votes}
        </div>
        <div className="vote-up" onClick={() => this.handleVote(1)}>
          <i className="fas fa-arrow-up"></i>
        </div>
      </div>
    );
  }
}
