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
    return NextResponse.json(
      { error: 'Missing OpenWeather API key' },
      { status: 500 }
    );
  }

  // Set the URL to a fake one or a valid one, depending on the environment or a certain condition
  let url: string;

  // Here we mock the API request based on the condition of hitting the API limit (429 or testing)
  const isTesting = false; // Change this to switch between real/fake API

  if (isTesting) {
    // Mock data response
    url = 'test';
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKey}`;
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
        cod: '200',
        message: 0,
        cnt: 40,
        list: [
          {
            dt: 1605182400,
            main: {
              temp: 53.6,
              feels_like: 49.8,
              temp_min: 52.0,
              temp_max: 53.6,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 1012,
              humidity: 76,
              temp_kf: 0.89,
            },
            weather: [
              {
                id: 500,
                main: 'Rain',
                description: 'light rain',
                icon: '10n',
              },
            ],
            clouds: {
              all: 80,
            },
            wind: {
              speed: 4.12,
              deg: 120,
            },
            visibility: 10000,
            pop: 0.42,
            rain: {
              '3h': 0.58,
            },
            sys: {
              pod: 'n',
            },
            dt_txt: '2020-11-12 21:00:00',
          },
          {
            dt: 1605193200,
            main: {
              temp: 50.34,
              feels_like: 47.68,
              temp_min: 48.97,
              temp_max: 50.34,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 1012,
              humidity: 81,
              temp_kf: 0.76,
            },
            weather: [
              {
                id: 802,
                main: 'Clouds',
                description: 'scattered clouds',
                icon: '03n',
              },
            ],
            clouds: {
              all: 40,
            },
            wind: {
              speed: 3.5,
              deg: 100,
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
              pod: 'n',
            },
            dt_txt: '2020-11-13 00:00:00',
          },
        ],
        city: {
          id: 2643743,
          name: 'London',
          coord: {
            lat: 51.5085,
            lon: -0.1257,
          },
          country: 'GB',
          population: 1000000,
          timezone: 0,
          sunrise: 1605167283,
          sunset: 1605201724,
        },
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
