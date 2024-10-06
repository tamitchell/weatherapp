import { iconMap, IconName } from "./iconMap";

interface IconProps {
name: IconName;
size?: number;
color?: string;
  }
  
export default function Icon({ name, size = 24, color = 'black', ...props }: IconProps) {
    const SVGIcon = iconMap[name];
  
    return (
      <SVGIcon
        width={size}
        height={size}
        fill={color}
        {...props}
      />
    );
  };
