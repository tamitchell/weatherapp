import React from "react";

function Location(props) {
  let showLocation;
  if (props.result != null || undefined) {
    showLocation = props.result.map((obj, i) => {
        console.log(obj.location.lat, obj.location.lng)
      return (
        <div key={i}>
          <button onClick={() => props.getWeather(obj.location.lat, obj.location.lng)}>
            <p>{obj.formatted_address}</p>
          </button>
        </div>
      );
    });
  } else {
      showLocation = <div>No results found</div>
  }
  return (
    <div>
      {showLocation}
    </div>
  );
}

export default function LocationHOC(props) {
  return (
    <div>
      <Location {...props} />
    </div>
  );
}
