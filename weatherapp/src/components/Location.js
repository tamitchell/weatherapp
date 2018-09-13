import React from "react";

export default function Location({...props}) {
  let showLocation;
  if (props.result != null || undefined) {
    showLocation =  props.result.slice(0, 3).map((obj, i) => {
      return (
        <div key={i} className="hoverable">
          <button onClick={() => props.getWeather(obj.location.lat, obj.location.lng)}>
            <p>{obj.formatted_address}</p>
          </button>
        </div>
      );
    });
  } else {
      showLocation = <div className="container">No results found</div>
  }
  return (
    <div className="container-fluid location-component">
      {showLocation}
    </div>
  );
}