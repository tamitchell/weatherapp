import React from 'react';

interface IconWrapperProps {
  size?: number | string;
  color?: string;
  children: React.ReactNode;
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
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { fill: color })
          : child
      )}
    </svg>
  );
};