import {
    APILoader,
    PlacePicker,
  } from "@googlemaps/extended-component-library/react";
import clsx from "clsx";
  
  export const GooglePlacesPicker = ({ handleChange }: { handleChange: (e: Event) => void }) => (
    <>
    <APILoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY} solutionChannel="" />
      <PlacePicker
        className={clsx("w-full h-full border-gray-300 text-gray-700 bg-gray-100")}
        placeholder="Enter city name e.g. Vancouver, BC"
        onPlaceChange={handleChange}
      />
    </>
  );