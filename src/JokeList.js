import React, { Component } from "react";
import Joke from "./Joke";
import Laugh from "./laugh.svg";
import "./JokeList.scss";

export default class JokeList extends Component {
  render() {
    return (
      <div className="Jokelist">
        <div className="Jokelist-sidebar">
          <h2 className="Jokelist-title">
            <span>Dad</span> Jokes
          </h2>
          <img src={Laugh} alt="Laughing Face" />
          <button onClick={this.props.getJokes} className="Jokelist-getmore">
            Get More Jokes
          </button>
        </div>
        <div className="Jokelist-jokes">
          {this.props.jokes ? (
            this.props.jokes.map(jk => <Joke key={jk.id} joke={jk} />)
          ) : (
            <p>No Jokes</p>
          )}
        </div>
      </div>
    );
  }
}
