
import { weatherIconMap, WeatherIconName } from "./iconMap";
interface IconProps {
    name: WeatherIconName;
    size?: number;
    color?: string;
      }
      
    export default function WeatherIcon({ name, size = 24, color = 'black', ...props }: IconProps) {
        const SVGIcon = weatherIconMap[name];
      
        return (
          <SVGIcon
            width={size}
            height={size}
            fill={color}
            {...props}
          />
        );
      };
    