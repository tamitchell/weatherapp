import React from "react";

function Location() {
    return(
        <div>
            <h1>Hi I'm the locations!!</h1>
        </div>
    )
}

export default function LocationHOC(lat, lng) {
    return (
        <div>
            <Location />
        </div>
    )
}