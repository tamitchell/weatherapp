import { NextResponse } from 'next/server';
import { OutfitRecommendationRequest } from 'src/types/types';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  const promptInstructions = process.env.PROMPT_TEMPLATE;

  if (!promptInstructions) {
    return NextResponse.json(
      { error: 'Missing Prompt Instructions not present' },
      { status: 500 }
    );
  }

  const promptTemplate = new PromptTemplate({
    template: promptInstructions,
    inputVariables: [
      'temp',
      'unit',
      'feelsLike',
      'conditions',
      'humidity',
      'windSpeed',
      'speedUnit',
      'chanceOfPrecip',
      'precipitationType',
    ],
  });

  try {
    const {
      currentWeather,
      units,
      chanceOfPrecip,
    }: OutfitRecommendationRequest = await request.json();

    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: apiKey,
    });

    const formattedPrompt = await promptTemplate.format({
      temp: Math.round(currentWeather.main.temp),
      unit: units === 'imperial' ? 'F' : 'C',
      feelsLike: Math.round(currentWeather.main.feels_like),
      conditions: currentWeather.weather[0].description,
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed),
      speedUnit: units === 'imperial' ? 'mph' : 'm/s',
      chanceOfPrecip: chanceOfPrecip.probability,
      precipitationType: chanceOfPrecip.type,
    });

    const response = await model.invoke(formattedPrompt);

    return NextResponse.json({ recommendation: response.content });
  } catch (error) {
    console.error('Error in outfit recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
