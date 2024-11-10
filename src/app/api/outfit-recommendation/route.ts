import { NextResponse } from "next/server";
import { OutfitRecommendationRequest, Units } from "src/types/types";


function getMockOutfit(temp: number, conditions: string, units: Units) {
  const tempC = units === 'metric' ? temp : (temp - 32) * 5/9;
  
  if (tempC <= 0) {
    return {
      topLayer: "Heavy winter coat",
      midLayer: "Warm sweater",
      baseLayer: "Thermal undershirt",
      bottom: "Insulated pants",
      accessories: ["Winter hat", "Scarf", "Gloves", "Warm boots"],
      specialNotes: "Extremely cold! Layer up well and cover exposed skin."
    };
  } else if (tempC <= 10) {
    return {
      topLayer: "Warm jacket",
      midLayer: "Light sweater",
      baseLayer: "Long-sleeve shirt",
      bottom: "Jeans",
      accessories: ["Light gloves", "Beanie"],
      specialNotes: "Chilly conditions - consider bringing an extra layer."
    };
  } else if (tempC <= 20) {
    return {
      topLayer: "Light jacket or hoodie",
      baseLayer: "T-shirt",
      bottom: "Jeans or chinos",
      accessories: ["Light scarf"],
      specialNotes: conditions.includes("rain") ? "Don't forget an umbrella!" : "Perfect weather for outdoor activities."
    };
  } else {
    return {
      topLayer: "T-shirt",
      bottom: "Shorts or light pants",
      accessories: ["Sunglasses", "Hat"],
      specialNotes: "Hot weather - choose breathable, light-colored clothing."
    };
  }
}


export async function POST(request: Request) {
    const apiKey = process.env.OPENAI_KEY;
    if (!apiKey) {
      console.log('missing apiKey');
      return NextResponse.json(
        { error: 'Missing OpenAI API key' },
        { status: 500 }
      );
    }

    try {
        const { currentWeather, units }: OutfitRecommendationRequest = await request.json();

        const outfit = getMockOutfit(
          currentWeather.main.temp,
          currentWeather.weather[0].description.toLowerCase(),
          units
        );
        return NextResponse.json(outfit);

    } catch(error) {
        console.error('Error in outfit recommendation:', error);
        return NextResponse.json(
          { error: 'Failed to process request' },
          { status: 500 }
        );
      }
    }