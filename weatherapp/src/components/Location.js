import React from "react";

export default function Location({...props}) {
  let showLocation;
  if (props.result != null || undefined) {
    showLocation =  props.result.slice(0, 3).map((obj, i) => {
      return (
        <div key={i} className="container">
          <button onClick={() => props.getWeather(obj.location.lat, obj.location.lng)}>
            <p>{obj.formatted_address}</p>
          </button>
        </div>
      );
    });
  } else {
      let date = new Date()
      showLocation = <div>No results found</div>
  }
  return (
    <div>
      {showLocation}
    </div>
  );
}