import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';
    // Default to New York City
    const lat = 40.7128;
    const lng = -74.0060;
  
    try {
      const response = await fetch(`${baseUrl}/api/weather?lat=${lat}&lng=${lng}`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Error fetching weather data');
      }
  
      return {
        props: {
          initialWeather: data,
          initialAddress: 'New York', // Example address
        },
      };
    } catch (error) {
      console.error('Error fetching initial weather data:', error);
      return {
        props: {
          initialWeather: null,
          initialAddress: '',
        },
      };
    }
  };