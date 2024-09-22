import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
    // Default to New York City
    const lat = 40.7128;
    const lng = -74.0060;
  
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const weatherData = await response.json();
  
      return {
        props: {
          initialWeather: weatherData,
          initialAddress: "New York City",
        },
      };
    } catch (error) {
      console.error('Error fetching initial weather data:', error);
      return {
        props: {
          initialWeather: null,
          initialAddress: "",
        },
      };
    }
  };