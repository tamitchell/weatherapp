import { ForecastItem, Units } from "src/types/types";
import DayForecast from "./DayForecast";
import { render, screen } from "@testing-library/react";

jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => ({ temp, units }: { temp: number, units: Units }) => (
    <div data-testid="main-temp">{`${temp}-${units}`}</div>
));
jest.mock('../DayWeatherStats/DayWeatherStats', () => ({ pop, humidity, windSpeed, units, precipType }: { pop: number, humidity: number, windSpeed: number, units: string, precipType: string }) => (
    <div data-testid="day-weather-stats">{`${pop}-${humidity}-${windSpeed}-${units}-${precipType}`}</div>
));

jest.mock('../WeatherIcon/WeatherIcon', () => ({ name, size, fill, stroke }: { name: string, size: number, fill: string, stroke: string }) => (
    <div data-testid="weather-icon">{`Icon: ${name}, Size: ${size}, Fill: ${fill}, Stroke: ${stroke}`}</div>
));

describe('DayForecast', () => {
    const baseForecast: ForecastItem = {
        dt: 1634472000,
        main: {
            temp: 20,
            feels_like: 18,
            temp_min: 15,
            temp_max: 25,
            pressure: 1015,
            humidity: 65,
        },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 5, deg: 180 },
        pop: 0.2,
        clouds: { all: 0 },
        visibility: 10000,
        sys: { pod: 'd' },
        dt_txt: '2021-10-17 12:00:00',
    };

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