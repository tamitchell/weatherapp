import { render, screen } from '@testing-library/react';
import WeeklyForecast from './WeeklyForecast';
import { generateMockForecast } from 'src/util/generators';
import { Units } from 'src/types/types';
import dayjs from 'dayjs';

jest.mock('../WeatherIcon/WeatherIcon', () => ({
  __esModule: true,
  default: ({ name, index }: { name: string; index: number }) => (
    <div data-testid={`weather-icon-${index}`}>WeatherIcon: {name}</div>
  ),
}));

jest.mock('../MainTemperatureDisplay/MainTemperatureDisplay', () => ({
  __esModule: true,
  default: ({
    temp,
    units,
    index,
  }: {
    temp: number;
    units: Units;
    index: number;
  }) => (
    <div
      data-testid={`main-temp-${index}`}
    >{`MainTemperatureDisplay: ${temp} ${units}`}</div>
  ),
}));

jest.mock('../WeatherDescription/WeatherDescription', () => ({
  __esModule: true,
  default: ({ description, index }: { description: string; index: number }) => (
    <div
      data-testid={`weather-description-${index}`}
    >{`WeatherDescription: ${description}`}</div>
  ),
}));

jest.mock('../TemperatureRange/TemperatureRange', () => ({
  __esModule: true,
  default: () => <div data-testid="temperature-range">TemperatureRange</div>,
}));

jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid={`icon-${name}`}>{name} Icon</div>
  ),
}));

jest.mock(
  '../WeeklyForecastSkeletonLoader/WeeklyForecastSkeletonLoader',
  () => ({
    __esModule: true,
    default: () => <div data-testid="loading-skeleton">Loading...</div>,
  })
);

describe('WeeklyForecast', () => {
  const startDate = dayjs().startOf('day'); // Use today as the start date
  const mockForecast = generateMockForecast(
    5,
    [0, 1, 0, 0, 1], // rainAmounts
    [0, 0, 0, 0, 0], // snowAmounts
    [0.2, 0.5, 0.1, 0.3, 0.65], // pops
    startDate.unix() // Start date
  );

  it('displays the loading state when isLoading is true', () => {
    render(<WeeklyForecast forecast={[]} units="imperial" isLoading={true} />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders the correct number of forecast cards when data is available', () => {
    render(
      <WeeklyForecast
        forecast={mockForecast}
        units="imperial"
        isLoading={false}
      />
    );

    const forecastCards = screen.getAllByTestId(/^forecast-card-/);
    expect(forecastCards).toHaveLength(5);

    // Check for the next 5 days
    for (let i = 0; i < 5; i++) {
      const date = dayjs().add(i, 'day');
      expect(screen.getByText(date.format('MMM D'))).toBeInTheDocument();
    }
  });

  it('correctly applies the data transformation logic (filterForecastByUserTime)', () => {
    render(
      <WeeklyForecast
        forecast={mockForecast}
        units="imperial"
        isLoading={false}
      />
    );

    const currentMonth = dayjs().format('MMM');

    // Check for the current month in the rendered forecast
    expect(
      screen.getAllByText(
        (content, element) =>
          element?.tagName.toLowerCase() === 'p' &&
          content.includes(currentMonth)
      )
    ).toHaveLength(5); // Expecting 5 dates with the current month

    // Optionally, check for specific dates if needed
    const startDate = dayjs();
    for (let i = 0; i < 5; i++) {
      const expectedDate = startDate.add(i, 'day').format('MMM D');
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    }
  });

  it('displays precipitation, humidity, and wind speed correctly', () => {
    render(
      <WeeklyForecast
        forecast={mockForecast}
        units="imperial"
        isLoading={false}
      />
    );

    // Check that the correct percentages are displayed
    expect(screen.getAllByText(/\d+%/)).toHaveLength(10); // 5 for precipitation, 5 for humidity
    expect(screen.getAllByText(/\d+ mph/)).toHaveLength(5); // 5 for wind speed

    // Check for specific values
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getAllByText('75%')).toHaveLength(5); // Humidity
    expect(screen.getAllByText('5 mph')).toHaveLength(5);
  });
});
