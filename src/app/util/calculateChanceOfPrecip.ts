import { WeatherData } from "../types";

export default function calculateRainProbability(weather: WeatherData): number | null {
    if (weather.rain) {
      const rainVolume = weather.rain['1h'] || weather.rain['3h'] || 0;  // Get the rain volume (in mm)
  
      if (rainVolume >= 2) {
        return 70 + Math.min(rainVolume - 2, 30); // Heavy rain (70-100%)
      } else if (rainVolume >= 0.5) {
        return 40 + Math.floor((rainVolume - 0.5) * 60 / 1.5); // Moderate rain (40-70%)
      } else {
        return 20 + Math.floor((rainVolume / 0.5) * 20); // Low rain (20-40%)
      }
    }
    
    return null; 
}
  