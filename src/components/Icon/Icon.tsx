import { iconMap, IconName } from "../../data/iconMap";

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
        data-testid={`icon-${name}`}
        stroke={stroke}
        {...props}
      />
    );
  };
