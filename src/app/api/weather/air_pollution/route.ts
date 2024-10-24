import { NextResponse } from 'next/server';

const allowedOrigins = [
  'https://weatherapp-nine-mauve.vercel.app',
  'https://weatherapp-git-dev-tashas-projects-4e4847e8.vercel.app',
  'https://weatherapp-tashas-projects-4e4847e8.vercel.app',
  process.env.NEXT_PUBLIC_VERCEL_URL,
];

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

  let url: string;

  // Here we mock the API request based on the condition of hitting the API limit (429 or testing)
  const isTesting = false; // Change this to switch between real/fake API

  if (isTesting) {
    // Mock data response
    url = 'test';
  } else {
    url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKey}`;
    // const url = "test"
  }

  try {
    // Get the origin of the request
    const origin = request.headers.get('origin') || '';
    const headers = new Headers();

    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
    } else {
      headers.set('Access-Control-Allow-Origin', 'null');
    }

    // Set CORS headers
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
    headers.set(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, Accept'
    );
    headers.set('Access-Control-Allow-Credentials', 'true'); // If you need to allow credentials

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers, status: 200 });
    }

    let data;
    if (isTesting) {
      // Return mock data to avoid hitting the actual API
      data = {
        coord: {
          lon: -0.1257,
          lat: 51.5085,
        },
        list: [
          {
            main: {
              aqi: 2, // Air Quality Index (1 to 5)
            },
            components: {
              co: 201.94, // Carbon Monoxide (μg/m³)
              no: 0.05, // Nitric Oxide (μg/m³)
              no2: 12.36, // Nitrogen Dioxide (μg/m³)
              o3: 51.72, // Ozone (μg/m³)
              so2: 0.82, // Sulfur Dioxide (μg/m³)
              pm2_5: 8.34, // PM2.5 (Fine Particulate Matter)
              pm10: 12.57, // PM10 (Coarse Particulate Matter)
              nh3: 0.77, // Ammonia (μg/m³)
            },
            dt: 1605182400, // Timestamp
          },
        ],
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
