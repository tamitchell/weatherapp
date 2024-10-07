"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { textStyles } from "../styles/styles";

type DayProps = {
  data: {
    apparentTemperatureHigh: number;
    apparentTemperatureLow: number;
    time: number;
    icon: string;
    summary: string;
  };
};

export default function Day({ data }: DayProps) {
  const hitemp = Math.round(data.apparentTemperatureHigh);
  const lotemp = Math.round(data.apparentTemperatureLow);
  const date = new Date(data.time * 1000);

  return (
    <div className={clsx()}>
      <span>
        <p>{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
        <p>HI {hitemp}&#8457;</p>
        <p>LO {lotemp}&#8457;</p>
        <Image
          src={`@/img/${data.icon}.png`}
          alt={data.icon}
          width={50}
          height={50}
        />
        <p className={textStyles.regular}>{data.summary}</p>
      </span>
    </div>
  );
}
