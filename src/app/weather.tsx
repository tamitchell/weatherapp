'use client'

import React from "react";
import Image from "next/image";

import humidityImg from "@/img/humidity.png";
import umbrellaImg from "@/img/umbrella.png";
import windspeedImg from "@/img/windspeed.png";
import uvImg from "@/img/uv.png";
import { WeatherProps } from "@/types";
import clsx from 'clsx';
import { baseStyles, imageStyles, textStyles, weatherStyles } from "./styles/styles"; // Adjust path as necessary


export default function Weather({ data, address }: WeatherProps) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (!data || !data.current) {
    return (
      <div>
        <div className={textStyles.regular}>
          Loading weather data...
        </div>
        <span className={baseStyles.flexCenter}>
          <p>Gathering Local Weather Data...</p>
          {/* <div className={weatherStyles.progress}>
            <div className={weatherStyles.indeterminate} />
          </div> */}
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className={baseStyles.container}>
          Today is {date.toLocaleDateString("en-US", options)}
        </div>
        <span className={baseStyles.container}>
          {/* <p>Gathering Local Weather Data...</p> */}
          {/* <div className={styles.progress}>
              <div className={styles.indeterminate} />
            </div> */}
        </span>
      </div>
    );
  }
  const temp = Math.round(data.current.temp);
  const windspeed = Math.round(data.current.wind_speed);
  const humidity = `${data.current.humidity}%`;
  const uvi = Math.round(data.current.uvi);
  const pop = data.daily[0] ? `${(data.daily[0].pop * 100).toFixed(0)}%` : 'N/A';

  return (
    <div className={clsx(weatherStyles.component)}>
      <p>{address}</p>
      <div className={clsx(weatherStyles.mainWeather)}>
        <Image
          src={`/images/${data.current.weather[0].icon}.png`}
          className={clsx(weatherStyles.mainImg)}
          alt={data.current.weather[0].description}
          width={100}
          height={100}
        />
        <p className={clsx(weatherStyles.temp)}>{temp}&#8457;</p>
        <span className={clsx(weatherStyles.summary)}>
          <p>{data.current.weather[0].description}</p>
        </span>
      </div>
      <span className={clsx(weatherStyles.weatherDetails)}>
        <p>
          <Image
            src={humidityImg}
            title="Humidity"
            alt="Humidity icon"
            width={20}
            height={20}
            className={clsx(imageStyles.detailIcon)}
          />
          {humidity}
        </p>
        <p>
          <Image
            src={windspeedImg}
            title="Wind Speed"
            alt="Wind Speed icon"
            width={20}
            height={20}
            className={clsx(imageStyles.detailIcon)}
          />
          {windspeed} mph
        </p>
        <p>
          <Image
            src={uvImg}
            title="UV Index"
            alt="UV Index icon"
            width={20}
            height={20}
            className={clsx(imageStyles.detailIcon)}
          />
          {uvi}
        </p>
        <p>
          <Image
            src={umbrellaImg}
            title="Probability of Precipitation"
            alt="Probability of Precipitation icon"
            width={20}
            height={20}
            className={clsx(imageStyles.detailIcon)}
          />
          {pop}
        </p>
      </span>
    </div>
  );
}