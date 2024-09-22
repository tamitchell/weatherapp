'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import { SearchProps } from "@/types";
import clsx from "clsx";
import { baseStyles, inputStyles } from "./styles/styles";

export default function Search({ getLatLng }: SearchProps) {
    const [userInput, setUserInput] = useState<string>("");

    // Handler for input change event
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserInput(e.target.value);
    };
  
    // Handler for form submission event
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      getLatLng(e, userInput);
    };

  return (
    <div className={clsx(baseStyles.flexCenter, "border-2 h-[20vh]")}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className={clsx(inputStyles.searchInput, "bg-white")}
          onChange={handleChange}
          placeholder="Enter a city, zipcode, or address"
          value={userInput}
        />
      </form>
    </div>
  );
}