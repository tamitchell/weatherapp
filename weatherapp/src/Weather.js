import React from 'react'

function Weather () {
    return(
        <div>
            <h1>Hi I'm the weather!</h1>
        </div>
    )
}

export default function WeatherHOC(lat, lng) {
    return (
        <div>
            <Weather />
        </div>
    )
}