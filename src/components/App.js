import React, { Component } from "react";
import Search from "./Search";
import Weather from "./Weather";
import Location from "./Location";
import Navigation from "./Navigation";
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
    let key = process.env.REACT_APP_GEOCODE_KEY;
    let url = "https://api.geocod.io/v1.3/geocode?q=" + input + "&api_key=" + key;
    let res = await fetch(url, { credentials: "same-origin" });
    let json = await res.json();
    this.setState({ results: json.results });
  };

  getWeather = async (lat, lng, address) => {
    const key = process.env.REACT_APP_DARKSKY_KEY;
    const proxyurl = "https://agile-journey-28298.herokuapp.com/";
    const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    let res = await fetch(proxyurl + url);
    let json = await res.json();
    this.setState({ weather: json, address: address });
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
        <Navigation/>
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
