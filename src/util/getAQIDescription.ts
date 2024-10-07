import { AirQualityDescription, AirQualityIndex } from "../types/types";

export default function getAirQualityDescription(aqi: number): AirQualityDescription {
    switch (aqi) {
        case AirQualityIndex.Good:
          return "Good";
        case AirQualityIndex.Fair:
          return "Fair";
        case AirQualityIndex.Moderate:
          return "Moderate";
        case AirQualityIndex.Poor:
          return "Poor";
        case AirQualityIndex.VeryPoor:
          return "Very Poor";
        default:
          return "Unknown AQI level";
      }
  };