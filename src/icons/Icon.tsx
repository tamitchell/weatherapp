import { iconMap, IconName } from "./iconMap";

interface IconProps {
name: IconName;
size?: number;
fill?: string;
stroke?: string;
  }
  
export default function Icon({ name, size = 24, stroke, fill = "black", ...props }: IconProps) {
    const SVGIcon = iconMap[name];
  
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
