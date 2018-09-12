import React from 'react'

export default function Weather (props) {
    let obj = props.data
    if(obj === undefined || Object.getOwnPropertyNames(obj).length === 0) {
        console.log(obj)
        return <div>Enter in a city, zipcode, or address</div>
    } else {
        console.log(obj)
        return<div>
            <p>{obj.minutely.summary}</p>
            <p>{obj.currently.temperature}</p>
            <p>{obj.currently.humidity}</p>
            <p>{obj.currently.windSpeed}</p>
            <p>{obj.currently.uvIndex}</p>
            <p>{obj.currently.precipProbability}</p>
            </div>
            
            }
}
