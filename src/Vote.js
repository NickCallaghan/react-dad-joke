import React, { Component } from "react";
import "./Vote.scss";

export default class Vote extends Component {
  render() {
    return (
      <div className="vote-up">
        <span className="minus">-</span> V <span className="plus">+</span>
      </div>
    );
  }
}
