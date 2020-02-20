import React, { Component } from "react";
import axios from "axios";
import JokeList from "./JokeList";
import "./App.scss";

export default class App extends Component {
  static defaultProps = {
    numJokesToGet: 15
  };

  state = {
    jokes: []
  };

  // Fetch a single joke
  getSingleJoke = async () => {
    console.log("Fetching Joke");
    try {
      for (let i = 0; i < 10; i++) {
        const url = "https://icanhazdadjoke.com/";
        const resp = await axios.get(url, {
          headers: {
            Accept: "application/json"
          }
        });
        const joke = resp.data;
        joke.votes = 0;
        return joke;
      }
    } catch (err) {
      console.error(err);
      return { err: "There was an error" };
    }
  };

  // Get more jokes and add to state
  getManyJokes = async (event, numJokes = 10) => {
    const existingJokeIds = this.state.jokes.map(jk => jk.id);
    const newJokes = [];
    try {
      // While Jokes is less than num to fetch
      while (newJokes.length < numJokes) {
        // fetch a joke
        const joke = await this.getSingleJoke();
        // Check if joke is in existing jokes
        if (existingJokeIds.indexOf(joke.id) === -1) {
          //push jokes onto next jokes array
          newJokes.push(joke);
          // push new joke id on to existing joke id list
          existingJokeIds.push(joke.id);
        } else {
          console.log("duplicate detected");
        }
      }
    } catch (err) {
      console.error(err);
    }
    //update new jokes into state
    this.setState({
      jokes: [...this.state.jokes, ...newJokes]
    });
  };

  // Vote a joke up or down
  voteOnJoke = (jokeId, voteAdjustment) => {
    const jokes = this.state.jokes.map(jk => {
      if (jk.id === jokeId) {
        jk.votes += voteAdjustment;
        return jk;
      }
      return jk;
    });
    this.setState({ jokes });
  };

  async componentDidMount() {
    this.getManyJokes(null, this.props.numJokesToGet);
  }

  render() {
    return (
      <div className="App">
        <JokeList
          jokes={this.state.jokes}
          voteOnJoke={this.voteOnJoke}
          getManyJokes={this.getManyJokes}
        />
      </div>
    );
  }
}
