import React, { Component } from "react";
import Search from "./Search";
import WeatherHOC from './Weather'
import LocationHOC from './Location'
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userinput: '',
      results: [],
      weather: []
    };
  }

  handleSubmit = async (e, input) => {
    e.preventDefault();
    let query = await this.setState({userinput: input})
    let key = "d5fd944727ff49fb45fbe72b45241fe99959dc4";
    let url = "https://api.geocod.io/v1.3/geocode?q=" + this.state.userinput + "&api_key=" + key;
    let res = await fetch(url, { credentials: "same-origin" })
    let json = await res.json()
    let results = await this.setState({results: json.results})
    console.log(this.state.results)
  }


  getWeather = async (lat, lng) => {
    console.log(lat, lng)
    const key = "827cb0f86be6d0f872e35b6151c99e6c";
    const getUrl = (lat, lng) => `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    fetch(getUrl(lat, lng), { credentials: "same-origin" })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ weather: res.data})
        console.log(this.state.weather)
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.results)
    return (
      <div className="App">
        <h1>weather app</h1>
        <Search 
        handleSubmit={this.handleSubmit}
        />
        <LocationHOC 
        result={this.state.results}
        getWeather={this.getWeather}
        />
        <WeatherHOC />
      </div>
    );
  }
}

export default App;
