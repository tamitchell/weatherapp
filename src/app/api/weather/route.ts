import { NextResponse } from 'next/server';
import corsHeaders from 'src/util/api/corsHeaders';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const units = searchParams.get('units') || 'imperial';

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    console.log('missing apiKey');
    return NextResponse.json(
      { error: 'Missing OpenWeather API key' },
      { status: 500 }
    );
  }

  //  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKey}`;
  // Set the URL to a fake one or a valid one, depending on the environment or a certain condition
  let url: string;

  // Here we mock the API request based on the condition of hitting the API limit (429 or testing)
  const isTesting = false; // Change this to switch between real/fake API

  if (isTesting) {
    // Mock data response
    url = 'test';
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKey}`;
  }
  try {
    const origin = request.headers.get('origin') || '';
    const headers = corsHeaders(origin);

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers, status: 200 });
    }

    let data;
    if (isTesting) {
      // Return mock data to avoid hitting the actual API
      data = {
        coord: { lon: -0.1257, lat: 51.5085 },
        weather: [
          { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
        ],
        base: 'stations',
        main: {
          temp: 44.91,
          feels_like: 41.79,
          temp_min: 42.8,
          temp_max: 46.4,
          pressure: 1012,
          humidity: 81,
        },
        visibility: 10000,
        wind: { speed: 4.12, deg: 80 },
        clouds: { all: 0 },
        dt: 1605182400,
        sys: {
          type: 1,
          id: 1414,
          country: 'GB',
          sunrise: 1605167283,
          sunset: 1605201724,
        },
        timezone: 0,
        id: 2643743,
        name: 'London',
        cod: 200,
      };
    } else {
      // Make real API request
      const response = await fetch(url);
      data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.message },
          { status: response.status }
        );
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
