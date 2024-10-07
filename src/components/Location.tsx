"use client";
import React from "react";
import clsx from "clsx";
import { baseStyles, buttonStyles } from "../styles/styles";
import { LocationProps } from "../types/types";



export default function Location({ results, getWeather }: LocationProps) {
    if (!results || results.length === 0) {
        return <div className={clsx(baseStyles.flexCenter, "h-[20vh] border-2")}>No results found</div>;
      }

  return (
       <div className={clsx(baseStyles.flexCenter, "border-2 border-red")}>
      {results.slice(0, 3).map(({location, formatted_address}, i) => (
        <div key={i}>
          <button
            className={clsx(buttonStyles.base, buttonStyles.hover, buttonStyles.focus)}
            onClick={() =>
              getWeather(location.lat, location.lng, formatted_address)
            }
          >
            <p>{formatted_address}</p>
          </button>
        </div>
      ))}
    </div>
  );
}
