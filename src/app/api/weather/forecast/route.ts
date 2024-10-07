import { NextResponse } from 'next/server';

const allowedOrigins = [
  'https://weatherapp-nine-mauve.vercel.app',
  'https://weatherapp-git-dev-tashas-projects-4e4847e8.vercel.app',
  'https://weatherapp-tashas-projects-4e4847e8.vercel.app',
];


   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const lat = searchParams.get('lat');
     const lng = searchParams.get('lng');
     const units = searchParams.get('units') || 'imperial';

     if (!lat || !lng) {
       return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
     }

     const apiKey = process.env.OPENWEATHER_API_KEY;
     if (!apiKey) {
       return NextResponse.json({ error: 'Missing OpenWeather API key' }, { status: 500 });
     }

     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${units}&appid=${apiKey}`;

     try {

            // Get the origin of the request
    const origin = request.headers.get('origin') || "";
    const headers = new Headers();

    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
    } else {
      headers.set('Access-Control-Allow-Origin', 'null');
    }

    // Set CORS headers
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    headers.set('Access-Control-Allow-Credentials', 'true');  // If you need to allow credentials

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers, status: 200 });
    }


       const response = await fetch(url);
       const data = await response.json();

       if (!response.ok) {
         return NextResponse.json({ error: data.message }, { status: response.status });
       }

       return NextResponse.json(data);
     } catch (error) {
       console.error('Error fetching weather data:', error);
       return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
     }
   }