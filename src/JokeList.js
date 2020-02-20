import React, { Component } from "react";
import Joke from "./Joke";
import Laugh from "./laugh.svg";
import "./JokeList.scss";
import Spinner from "./Spinner";

export default class JokeList extends Component {
  render() {
    return (
      <div className="Jokelist">
        <div className="Jokelist-sidebar">
          <h2 className="Jokelist-title">
            <span>Dad</span> Jokes
          </h2>
          <img src={Laugh} alt="Laughing Face" />
          <button
            onClick={this.props.getJokes}
            className="Jokelist-getmore"
            onClick={this.props.getManyJokes}
          >
            Get More Jokes
          </button>
        </div>
        <div className="Jokelist-jokes">
          {this.props.jokes.length !== 0 ? (
            this.props.jokes.map(jk => (
              <Joke key={jk.id} joke={jk} voteOnJoke={this.props.voteOnJoke} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}
