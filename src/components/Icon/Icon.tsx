import { memo } from 'react';
import { iconMap, IconName } from '../../data/iconMap';

interface IconProps {
  name: IconName;
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}

export default memo(function Icon({
  name,
  size = 24,
  stroke,
  fill = 'currentColor',
  className,
  ...props
}: IconProps) {
  const SVGIcon = iconMap[name];
  const testId = `icon-${name}`;
  return (
    <SVGIcon
      width={size}
      height={size}
      className={className}
      fill={fill}
      data-testid={testId}
      stroke={stroke}
      {...props}
    />
  );
})
