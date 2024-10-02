'use client'; // Ensure the component is treated as a client component

import { APILoader } from "@googlemaps/extended-component-library/react";

export default function APILoaderWrapper() {
  return (
    <APILoader
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      solutionChannel=""
    />
  );
}