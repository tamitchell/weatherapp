import { Units } from 'src/types/types';

interface MainTemperatureDisplay {
  temp: number;
  units: Units;
  className?: string;
}

export default function MainTemperatureDisplay({
  className,
  temp,
  units,
}: MainTemperatureDisplay) {
  const roundedTemp = Math.round(temp);
  const unitSymbol = units === 'imperial' ? '°F' : '°C';
  return (
    <p className={`text-xl font-bold ${className}`} data-testid="main-temp">
      {roundedTemp}
      {unitSymbol}
    </p>
  );
}
