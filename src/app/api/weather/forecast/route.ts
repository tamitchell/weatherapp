import { NextResponse } from 'next/server';

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