import React, { Component } from "react";
import "./Vote.scss";

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.colors = {
      "-3": "#F0594E",
      "-2": "#F07872",
      "-1": "#F0A29D",
      "0": "#F0D58B",
      "1": "#E3FFE6",
      "2": "#96FFA3",
      "3": "#79CC83",
      "4": "#348054"
    };
    this.style = { backgroundColor: "#F0D58B" };
  }

  handleVote = voteAdjustment => {
    this.props.voteOnJoke(this.props.jokeId, voteAdjustment);
  };

  determineColor = () => {
    console.log("colors");
  };

  componentDidMount() {}

  render() {
    return (
      <div className="vote">
        <div className="vote-down" onClick={() => this.handleVote(-1)}>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="vote-count" style={this.style}>
          {this.props.votes}
        </div>
        <div className="vote-up" onClick={() => this.handleVote(1)}>
          <i className="fas fa-arrow-up"></i>
        </div>
      </div>
    );
  }
}
