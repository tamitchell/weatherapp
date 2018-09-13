import React from "react";
import humidityimg from "../img/humidity.png";
import umbrella from "../img/umbrella.png";
import windspeedimg from "../img/windspeed.png";
import uv from "../img/uv.png";

function Week(props) {
  let obj = props.data;
  return obj.map((instance, i) => <Day key={i} data={instance} />);
}

// function formatdate(props) {
//     let date = new Date(props.data.time)
//     let options ={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
//     return date.toLocaleDateString('us-EN', options)
// }

function Day(props) {
  console.log(props.data)
  let hitemp = Math.round(props.data.apparentTemperatureHigh);
  let lotemp = Math.round(props.data.apparentTemperatureLow);
//   let date = new Date(props.data.time)
//   let options ={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return (
    <div className=" days-container">
      <span>
        <img
          src={require(`../img/${props.data.icon}.png`)}
          alt={props.data.icon}
        />
        {/* <p>{date.toLocaleDateString('us-EN', options)}</p> */}
        <p className="hide-on-med-and-up">{props.data.summary}</p>
        <p>HI {hitemp}&#8457;</p>
        <p>LO {lotemp}&#8457;</p>
      </span>
    </div>
  );
}

export default function Weather(props) {
  let obj = props.data;
  let date = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  if (!obj || !Object.getOwnPropertyNames(obj).length) {
    return (
      <div className="container date flow-text">
        Today is {date.toLocaleDateString("en-US", options)}
      </div>
    );
  } else {
    console.log(obj)  
    let temp = Math.round(obj.currently.temperature);
    let windspeed = Math.round(obj.currently.windSpeed);
    let percent =
      parseFloat(obj.currently.precipProbability * 100).toFixed(0) + "%";
    let humidity = parseFloat(obj.currently.humidity * 100).toFixed(0) + "%";
    return (
      <div className="container-fluid">
        <div className="container weather-component">
          <div className="main-weather">
            <img
              src={require(`../img/${obj.currently.icon}.png`)}
              className="main-img"
              alt={obj.currently.icon}
            />
            <p className="temp">
              {temp}
              &#8457;
            </p>
            <span className="summary">
              <p>{obj.minutely.summary}</p>
            </span>
          </div>
          <span className="weather-details">
            <p>
              <img src={humidityimg} title="Humidity" alt="Humidity icon" />
              {humidity}
            </p>
            <p>
              <img
                src={windspeedimg}
                title="Wind Speed"
                alt="Wind Speed icon"
              />
              {windspeed}
              mph
            </p>

            <p>
              <img
                src={uv}
                title="Level of UV Radiation"
                alt="Level of UV Radiation icon"
              />
              {obj.currently.uvIndex}
            </p>
            <p>
              <img
                src={umbrella}
                title="Precipation Probability"
                alt="Precipation Probability icon"
              />
              {percent}
            </p>
          </span>
        </div>
        <div className="container-fluid week-container">
        <Week data={obj.daily.data} />
        </div>
      </div>
    );
  }
}
