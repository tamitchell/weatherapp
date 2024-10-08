import React, { PropsWithChildren, isValidElement, Children, cloneElement, ReactElement } from 'react';

interface IconWrapperProps extends PropsWithChildren {
  size?: number | string;
  color?: string;
  className?: string;
}

export default function IconWrapper({ 
  size = 24, 
  color = 'currentColor', 
  children, 
  className = '' 
}: IconWrapperProps) {
  const dimensions = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {Children.map(children, child =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<unknown & {fill: string}>, { fill: color })
          : child
      )}
    </svg>
  );
};