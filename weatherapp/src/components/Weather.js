import React from 'react'

export default function Weather (props) {
    let obj = props.data
    if(!obj || !Object.getOwnPropertyNames(obj).length) {
        return <div>Enter in a city, zipcode, or address</div>
    } else {
        console.log(obj)
        let temp = Math.round(obj.currently.temperature)
        return<div>
            <p>{obj.minutely.summary}</p>
            <p>Temp: {temp}</p>
            <p>Humidity: {obj.currently.humidity}</p>
            <p>WindSpeed: {obj.currently.windSpeed}</p>
            <p>UV : {obj.currently.uvIndex}</p>
            <p>{obj.currently.precipProbability}</p>
            </div>
            
            }
}
