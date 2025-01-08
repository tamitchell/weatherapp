import { weatherIconMap, WeatherIconName } from 'src/data/iconMap';

interface IconProps {
  name: WeatherIconName;
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}

export default function WeatherIcon({
  name,
  size = 24,
  fill = 'currentColor',
  stroke = 'currentColor',
  className,
  ...props
}: IconProps) {
  const SVGIcon = weatherIconMap[name];

  return (
    <SVGIcon
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
      className={className}
      {...props}
    />
  );
}
