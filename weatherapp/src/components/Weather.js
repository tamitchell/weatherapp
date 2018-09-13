import React from "react";

function Week(props) {
  let obj = props.data;
  return obj.map((instance, i) => <Day key={i} data={instance} />);
}

function Day(props) {
  console.log(props.data);
  return (
    <div>
      {props.data.summary}
      {props.data.apparentTemperatureHigh}
      <img
        src={require(`../img/${props.data.icon}.png`)}
        alt={props.data.icon}
      />
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
    let temp = Math.round(obj.currently.temperature);
    let percent =
      parseFloat(obj.currently.precipProbability * 100).toFixed(0) + "%";
    return (
      <div className="container-fluid">
        <div className="container weather-component">
          <div className="main-weather center-align">
            <img
              src={require(`../img/${obj.currently.icon}.png`)}
              alt={obj.currently.icon}
            />
            <p className="temp">{temp}</p>
            <p>{obj.currently.summary}</p>
          </div>
          <p>{obj.minutely.summary}</p>
          <p>Humidity: {obj.currently.humidity}</p>
          <p>
            WindSpeed: {obj.currently.windSpeed}
            mph
          </p>
          <p>UV : {obj.currently.uvIndex}</p>
          <p>Precipation Probability: {percent}</p>
        </div>
        <Week data={obj.daily.data} />
      </div>
    );
  }
}
