import React, { Component } from "react";
import axios from "axios";
import JokeList from "./JokeList";
import "./App.scss";

export default class App extends Component {
  static defaultProps = {
    numJokesToGet: 15
  };

  constructor(props) {
    super(props);
    //load jokes from localstorage or intialise jokes state empty
    if (window.localStorage.getItem("jokes")) {
      this.state = {
        jokes: JSON.parse(window.localStorage.getItem("jokes"))
      };
    } else {
      this.state = { jokes: [] };
    }
  }

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
        return { id: joke.id, votes: 0, joke: joke.joke };
      }
    } catch (err) {
      console.error(err);
      return { err: "There was an error" };
    }
  };

  saveJokeToLocalStorage = () => {
    console.log("Saving to LocalStorage");
    const jokeString = JSON.stringify(this.state.jokes);
    const localStorage = window.localStorage;
    localStorage.setItem("jokes", jokeString);
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
        }
      }
    } catch (err) {
      console.error(err);
    }
    //update new jokes into state
    await this.setState({
      jokes: [...this.state.jokes, ...newJokes]
    });
    this.saveJokeToLocalStorage();
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
    this.saveJokeToLocalStorage();
  };

  async componentDidMount() {
    // Only fetch jokes if there are none in localstorage
    if (this.state.jokes.length === 0) {
      this.getManyJokes(null, this.props.numJokesToGet);
    }
  }

  render() {
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="App">
        <JokeList
          jokes={jokes}
          voteOnJoke={this.voteOnJoke}
          getManyJokes={this.getManyJokes}
        />
      </div>
    );
  }
}
