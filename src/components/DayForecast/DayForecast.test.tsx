import { ForecastItem, Units } from "src/types/types";
import DayForecast from "./DayForecast";
import { render, screen } from "@testing-library/react";
import { generateForecastItem } from "src/util/generators";

jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => {
    const MockMainTemperatureDisplay = ({ temp, units }: { temp: number, units: Units }) => (
      <div data-testid="main-temp">{`${temp}-${units}`}</div>
    );
    MockMainTemperatureDisplay.displayName = 'MainTemperatureDisplay';
    return MockMainTemperatureDisplay;
  });
  
  jest.mock('../DayWeatherStats/DayWeatherStats', () => {
    const MockDayWeatherStats = ({ pop, humidity, windSpeed, units, precipType }: { pop: number, humidity: number, windSpeed: number, units: string, precipType: string }) => (
      <div data-testid="day-weather-stats">{`${pop}-${humidity}-${windSpeed}-${units}-${precipType}`}</div>
    );
    MockDayWeatherStats.displayName = 'DayWeatherStats';
    return MockDayWeatherStats;
  });
  
  jest.mock('../WeatherIcon/WeatherIcon', () => {
    const MockWeatherIcon = ({ name, size, fill, stroke }: { name: string, size: number, fill: string, stroke: string }) => (
      <div data-testid="weather-icon">{`Icon: ${name}, Size: ${size}, Fill: ${fill}, Stroke: ${stroke}`}</div>
    );
    MockWeatherIcon.displayName = 'WeatherIcon';
    return MockWeatherIcon;
  });

describe('DayForecast', () => {
    const baseForecast: ForecastItem = generateForecastItem({
        dt: 1634472000,
        dt_txt: '2021-10-17 12:00:00',
        temp: 20,
        feels_like: 18,
        temp_min: 15,
        temp_max: 25,
        pressure: 1015,
        humidity: 65,
        wind_speed: 5,
        wind_deg: 180,
        pop: 0.2,
        clouds_all: 0,
        weather_id: 800,
        weather_main: 'Clear',
        weather_description: 'clear sky',
        weather_icon: '01d'
      });
      
    it('renders correctly with rain', () => {
        const rainForecast = { ...baseForecast, rain: { '3h': 1 } };
        render(<DayForecast forecast={rainForecast} units="imperial" />);

        expect(screen.getByText('Oct 17')).toBeInTheDocument();
        expect(screen.getByText('clear sky')).toBeInTheDocument();
        expect(screen.getByTestId('main-temp')).toHaveTextContent('20-imperial');
        expect(screen.getByTestId('day-weather-stats')).toHaveTextContent('0.2-65-5-imperial-rain');
        expect(screen.getByTestId('weather-icon')).toHaveTextContent('Icon: 01d, Size: 56, Fill: transparent, Stroke: black');
    });

    it('renders correctly with snow', () => {
        const snowForecast = { ...baseForecast, snow: { '3h': 1 } };
        render(<DayForecast forecast={snowForecast} units="imperial" />);

        expect(screen.getByTestId('day-weather-stats')).toHaveTextContent('0.2-65-5-imperial-snow');
    });

    it('renders correctly with no precipitation', () => {
        render(<DayForecast forecast={baseForecast} units="imperial" />);

        expect(screen.getByTestId('day-weather-stats')).toHaveTextContent('0.2-65-5-imperial-none');
    });

    it('renders correctly with metric units', () => {
        render(<DayForecast forecast={baseForecast} units="metric" />);

        expect(screen.getByTestId('main-temp')).toHaveTextContent('20-metric');
        expect(screen.getByTestId('day-weather-stats')).toHaveTextContent('0.2-65-5-metric-none');
    });
});