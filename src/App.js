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
    console.log("fetching jokes");
    // Individual request to get x number of jokes and push to array
    let jokes = [];
    for (let i = 0; i < 10; i++) {
      const url = "https://icanhazdadjoke.com/";
      const resp = await axios.get(url, {
        headers: {
          Accept: "application/json"
        }
      });
      const joke = resp.data;
      jokes.push(joke);
    }
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
