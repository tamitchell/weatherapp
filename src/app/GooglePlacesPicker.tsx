import {
    PlacePicker,
  } from "@googlemaps/extended-component-library/react";
import clsx from "clsx";

  export const GooglePlacesPicker = ({ handlePlaceChange }: { handlePlaceChange: (e: Event) => void;
  }) => (
    <div className="custom-place-picker">
      <PlacePicker
        className={clsx("w-full h-full border-gray-300 text-gray-700 bg-gray-100 custom-place-picker")}
        placeholder="Enter a location name or address"
        onPlaceChange={handlePlaceChange}
      />
    </div>
  );