'use client'

import {ChangeEvent, useRef, useState } from "react";
import clsx from "clsx";
import { baseStyles } from "@/app/styles/styles";
import dynamic from 'next/dynamic';
import { useWeather } from "./hooks/useWeather";
import {PlacePicker as TPlacePicker} from '@googlemaps/extended-component-library/place_picker.js';


//Google Places API logic

interface GooglePlace {
  formatted_address: string;

      lat: number;
      lng: number;
}

export default function Search() {
    const { weather, isLoading, error, address, getWeather } = useWeather();
    const pickerRef = useRef<TPlacePicker>(null);
    const [place, setSelectedPlace] = useState<GooglePlace | undefined>(undefined);
    // const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

    const PlacePicker = dynamic(
      () =>
        import('./GooglePlacesPicker').then(
          (mod) => mod.GooglePlacesPicker,
        ),
      { ssr: false },
    );

//Set any here because google response is a proxy that obfiscates the object into getters
    const handlePlaceChanged = (event: any) => {
      const place = event.target?.value
      if (place && place.location) {
        const selectedPlace: GooglePlace = {
          formatted_address: place.formatted_address,
          lat: place.location.lat(),
          lng: place.location.lng(),
        };
    
        setSelectedPlace(selectedPlace);
        getWeather(selectedPlace.lat, selectedPlace.lng, selectedPlace.formatted_address)
      } else {
        setSelectedPlace(undefined);
        //throw error
        console.error('Place data is incomplete or unavailable');
      }
    };

  return (
    <div className={clsx(baseStyles.flexCenter, "w-full py-4 m-0")}>
      <div className="w-full relative">
      <PlacePicker ref={pickerRef} handlePlaceChange={handlePlaceChanged} />
      </div>
    </div>
  );
}