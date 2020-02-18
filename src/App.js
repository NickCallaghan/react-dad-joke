import React, { Component } from "react";
import axios from "axios";
import JokeList from "./JokeList";
import "./App.scss";

export default class App extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  state = {
    jokes: []
  };

  fetchJokes = async () => {
    // Individual request to get x number of jokes and push to array
    let jokes = [];
    try {
      const url = "https://icanhazdadjoke.com/";
      const resp = await axios.get(url, {
        headers: {
          Accept: "application/json"
        }
      });
      const joke = resp.data;
      jokes.push(joke);
    } catch (err) {
      console.error(err);
    }

    // Add Jokes to any jokes currently in state
    this.setState(st => ({
      jokes: [...st.jokes, ...jokes]
    }));
  };

  async componentDidMount() {
    this.fetchJokes();
  }

  render() {
    return (
      <div className="App">
        <JokeList jokes={this.state.jokes} getJokes={this.fetchJokes} />
      </div>
    );
  }
}
