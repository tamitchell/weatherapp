
import { weatherIconMap, WeatherIconName } from "./iconMap";
interface IconProps {
    name: WeatherIconName;
    size?: number;
    fill?: string;
    stroke?: string;
      }
      
    export default function WeatherIcon({ name, size = 24, fill = 'currentColor', stroke = "currentColor", ...props }: IconProps) {
        const SVGIcon = weatherIconMap[name];
      
        return (
          <SVGIcon
            width={size}
            height={size}
            fill={fill}
            stroke={stroke}
            {...props}
          />
        );
      };
    