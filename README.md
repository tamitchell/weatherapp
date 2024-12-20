# First Watch Weather App

First Watch Weather is a weather app I initially developed inspired by the design of Dark Sky for desktop. My aim was simply to provide the same clean, simple interface on the web. After Dark Sky got bought out by Apple, I updated the design slightly and switched to the OpenWeather API for weather updates. I use the free tier, so updates happen on a slower cadence and may be outdated when comparing with the actual site data, specifically for the 5-day forecast. The work flow remains the same, however - users can verify the current conditions of their current location or any other location with the aid of the location search provided by Google.

Like many projects, this app continuously grows in scale. It's more of a pet project of mine, and while it may be a bit presumptuous, I like to use to try out new technologies or frameworks I've come by. It's not really meant to be used as a public sight, but I appreciate any feedback and critques are encouraged.

## Key Features:

- **Current Weather:** Get live current weather for any location in the world, right now, based on your current location or any other location that you search.
- **5-Day Forecast:** Get current conditions and a 5-day forecast with updates every 3 hours.
- **Location Search:** Use Google Places for searching within cities or specific locations and instantly view the weather.
- **User Preferences:** Easily switch between imperial and metric units for temperature and wind speed. The user's preference is stored for convenience.
- **Location Auto-Detection:** The app attempts auto-detection of the user's current location upon being granted access to geolocation.

## Future Features

### (Mid November 2024)

- **Do I need a jacket?** Addition of langchain ChatGPT generated feedback of what clothing a user may want to wear based on weather details

### (December 2024)

- First integration of end to end testing using cypress

### (January 2025)

- **Water the flowers!\*** First Iteration of pixel based mini-game when weather data isn't available or api is down.

## Technologies Used:

- **React:** A flexible and performance-oriented JavaScript library for building user interfaces.
- **Next.js:** A powerful React framework for server-side rendering and static site generation.
- **Google Places API:** Enables location-based search and retrieves detailed location information for cities and landmarks worldwide.
- **OpenWeather API:** Provides real-time current weather data and a 5-day forecast.
- **Jest:** For Unit testing
