"use client";
import React from "react";
import { LocationProps } from "@/app/types";
import clsx from "clsx";
import { baseStyles, buttonStyles } from "@/app/styles/styles";



export default function Location({ results, getWeather }: LocationProps) {
    if (!results || results.length === 0) {
        return <div className={clsx(baseStyles.flexCenter, "h-[20vh] border-2")}>No results found</div>;
      }

  return (
       <div className={clsx(baseStyles.flexCenter, "border-2 border-red")}>
      {results.slice(0, 3).map((obj, i) => (
        <div key={i}>
          <button
            className={clsx(buttonStyles.base, buttonStyles.hover, buttonStyles.focus)}
            onClick={() =>
              getWeather(obj.location.lat, obj.location.lng, obj.formatted_address)
            }
          >
            <p>{obj.formatted_address}</p>
          </button>
        </div>
      ))}
    </div>
  );
}
