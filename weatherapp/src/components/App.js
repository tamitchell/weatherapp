import React, { Component } from "react";
import Search from "./Search"
import Weather from './Weather'
import Location from './Location'
// import Week from './Week'
import "../sass/App.scss";
import "../sass/Weather.scss"
import "../sass/Location.scss"

class App extends Component {
  constructor() {
    super();
    this.state = {
      userinput: '',
      results: [],
      icon: '',
      weather: {}
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
  }

  render() {
    return (
      <div className="App">
        <Search 
        handleSubmit={this.handleSubmit}
        />
        <Location
        result={this.state.results}
        getWeather={this.getWeather}
        />
        <Weather
         data={this.state.weather}
         />
         {/* <Week 
         data={this.state.weather}
         /> */}
      </div>
    );
  }
}

export default App;
