import {
    PlacePicker,
  } from "@googlemaps/extended-component-library/react";
import clsx from "clsx";
import { LegacyRef } from "react";
import {PlacePicker as TPlacePicker} from '@googlemaps/extended-component-library/place_picker.js';


  export const GooglePlacesPicker = ({ handlePlaceChange, ref }: { handlePlaceChange: (e: Event) => void; ref: LegacyRef<TPlacePicker> | undefined
  }) => (
    <>
      <PlacePicker
        ref={ref}
        className={clsx("w-full h-full border-gray-300 text-gray-700 bg-gray-100")}
        placeholder="Enter city name e.g. Vancouver, BC"
        onPlaceChange={handlePlaceChange}
      />
    </>
  );