import { IconProps } from 'src/types/types';
import IconWrapper from './IconWrapper';

export default function WindSpeed({ size, color, className = '' }: IconProps) {
  return (
    <IconWrapper
      size={size}
      color={color}
      className={`windspeed-icon ${className}`}
    >
      <title>Wind Speed Icon</title>
      <path
        d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 
        <path className="wind-path" d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path className="wind-path" d="M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path className="wind-path" d="M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> */}
    </IconWrapper>
  );
}
