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
    await this.setState({userinput: input})
    let key = "d5fd944727ff49fb45fbe72b45241fe99959dc4";
    let url = "https://api.geocod.io/v1.3/geocode?q=" + this.state.userinput + "&api_key=" + key;
    let res = await fetch(url, { credentials: "same-origin" })
    let json = await res.json()
    await this.setState({results: json.results})
  }


  getWeather = async (lat, lng) => {
    const key = "827cb0f86be6d0f872e35b6151c99e6c";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}`
    let res = await fetch(proxyurl + url)
    let json = await res.json()
    await this.setState({ weather: json})
    console.log(this.state.weather)
  }

  render() {
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
        <WeatherHOC
         data={this.state.weather}
         />
      </div>
    );
  }
}

export default App;
