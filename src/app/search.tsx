'use client'

import {useState } from "react";
import clsx from "clsx";
import { baseStyles } from "@/app/styles/styles";
import dynamic from 'next/dynamic';


//Google Places API logic

export default function Search() {
    const [userInput, setUserInput] = useState<string>("");
    const PlacePicker = dynamic(
      () =>
        import('./GooglePlacesPicker').then(
          (mod) => mod.GooglePlacesPicker,
        ),
      { ssr: false },
    );

    // Handler for input change event
    const handleChange = (e: Event) => {
      console.log("target", e.currentTarget);
      setUserInput("");
      // setUserInput(e.currentTarget ?? "");
    };

    console.log("", userInput)
  
    // // Handler for form submission event
    // const handleSubmit = (e: FormEvent) => {
    //   e.preventDefault();
    //   getLatLng(userInput);
    // };

  return (
    <div className={clsx(baseStyles.flexCenter, "w-full py-4 m-0")}>
      <div className="w-full relative">
      <PlacePicker handleChange={handleChange} />
      </div>
    </div>
  );
}