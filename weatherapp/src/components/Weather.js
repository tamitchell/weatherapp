import React from 'react'

export default function Weather (props) {
    let obj = props.data
    let date = new Date()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    if(!obj || !Object.getOwnPropertyNames(obj).length) {
        return <div className="container">Today is {date.toLocaleDateString("en-US", options)}</div>
    } else {
        console.log(obj)
        let temp = Math.round(obj.currently.temperature)
        let percent =parseFloat(obj.currently.precipProbability).toFixed(2) + "%"
        return<div className="container">
            <h1>Today is {date.toLocaleDateString("en-US", options)}</h1>
            <p>{obj.minutely.summary}</p>
            <p>Temp: {temp}</p>
            <p>Humidity: {obj.currently.humidity}</p>
            <p>WindSpeed: {obj.currently.windSpeed}</p>
            <p>UV : {obj.currently.uvIndex}</p>
            <p>Precipation Probability: {percent}</p>
            </div>
            
            }
}
