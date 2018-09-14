import React, { Component } from "react";
import Search from "./Search";
import Weather from "./Weather";
import Location from "./Location";
// import Footer from './Footer'
import "../sass/App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userinput: "",
      results: [],
      icon: "",
      address: "",
      weather: {}
    };
  }

  getLatLng = async (e, input) => {
    e.preventDefault();
    let key = "d5fd944727ff49fb45fbe72b45241fe99959dc4";
    let url = "https://api.geocod.io/v1.3/geocode?q=" + input + "&api_key=" + key;
    let res = await fetch(url, { credentials: "same-origin" });
    let json = await res.json();
    this.setState({ results: json.results });
  };

  getWeather = async (lat, lng, address) => {
    const key = "827cb0f86be6d0f872e35b6151c99e6c";
    const proxyurl = "https://agile-journey-28298.herokuapp.com/";
    const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    let res = await fetch(proxyurl + url);
    let json = await res.json();
    this.setState({ weather: json, address: address });
    console.log(this.state.address)
  };

  componentDidMount = () => {
    //get user location automatically
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude)
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }


    }


  render() {
    return (
      <div className="App">
        <Search getLatLng={this.getLatLng} />
        <Location result={this.state.results} getWeather={this.getWeather} />
        <Weather 
        data={this.state.weather} 
        location={this.state.results}
        address={this.state.address} />
      </div>
    );
  }
}

export default App;
