'use client'

import clsx from "clsx";
import { baseStyles } from "@/app/styles/styles";
import dynamic from 'next/dynamic';
import { useWeather } from "./hooks/useWeather";
import { memo } from "react";


//Google Places API logic

interface GooglePlace {
  formatted_address: string;

      lat: number;
      lng: number;
}

export default memo(function Search() {
    const { getWeather } = useWeather();

    const PlacePicker = dynamic(
      () =>
        import('./GooglePlacesPicker').then(
          (mod) => mod.default,
        ),
      { ssr: false },
    );

//Set any here because google response is a proxy that obfiscates the object into getters
//@ts-expect-error Google Place Picker passes an unknown event
    const handlePlaceChanged = (event) => {
      const place = event.target?.value
      if (place && place.location) {
        const selectedPlace: GooglePlace = {
          formatted_address: place.formatted_address,
          lat: place.location.lat(),
          lng: place.location.lng(),
        };
    
        getWeather(selectedPlace.lat, selectedPlace.lng, selectedPlace.formatted_address)
      } else {
        //throw error
        console.error('Place data is incomplete or unavailable');
      }
    };

  return (
      <div className={clsx(baseStyles.flexCenter, "w-full")}>
      <PlacePicker handlePlaceChange={handlePlaceChanged} />
      </div>
  );
});