'use client'

import React from "react";
import Image from "next/image";

import humidityImg from "@/img/humidity.png";
import windspeedImg from "@/img/windspeed.png";
import uvImg from "@/img/uv.png";
import { WeatherProps } from "@/types";
import clsx from 'clsx';
import { imageStyles, weatherStyles } from "@/app/styles/styles";


export default function Weather({ data, address }: WeatherProps) {
  if (!data) return null;

const temp = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
  const feelsLike = Math.round(data.main.feels_like - 273.15)

  return (
    <div className={clsx(weatherStyles.component)}>
      <p>{address}</p>
      <div className={clsx(weatherStyles.mainWeather)}>
        <Image
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          className={clsx(weatherStyles.mainImg)}
          alt={data.weather[0].description}
          width={100}
          height={100}
        />
        <p className={clsx(weatherStyles.temp)}>{temp}&#8457;</p>
        <span className={clsx(weatherStyles.summary)}>
        <p>{data.weather[0].description}</p>
        <p>Feels like: {feelsLike}</p>
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
        <p>Humidity: {data.main.humidity}</p>
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
        <p>Wind: {data.wind.speed}</p>
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
        <p>Pressure: {data.main.pressure} hPa</p>
        </p>
      </span>
    </div>
  );
}