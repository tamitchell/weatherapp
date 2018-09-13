import React from 'react'

export default function Weather (props) {
    let obj = props.data
    let date = new Date()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    if(!obj || !Object.getOwnPropertyNames(obj).length) {
        return <div className="container date flow-text">Today is {date.toLocaleDateString("en-US", options)}</div>
    } else {
        console.log(obj)
        let temp = Math.round(obj.currently.temperature)
        let percent =parseFloat(obj.currently.precipProbability * 100).toFixed(0) + "%"
        return<div className="container weather-component">
            <div className="main-weather center-align">
            <img src={require(`../img/${obj.currently.icon}.png`)} alt={obj.currently.icon} />
            <p className="temp">{temp}</p>
            <p>{obj.currently.summary}</p>
            </div>
            <p>{obj.minutely.summary}</p>
            <p>Humidity: {obj.currently.humidity}</p>
            <p>WindSpeed: {obj.currently.windSpeed}mph</p>
            <p>UV : {obj.currently.uvIndex}</p>
            <p>Precipation Probability: {percent}</p>
            </div>
            
            }
}
