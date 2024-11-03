import { motion } from 'framer-motion';

interface AnimatedIcon {
  speed?: number;
  size?: number;
  className?: string;
  stroke?: string;
  'aria-label'?: string;
}

export default function WindSpeedIcon({ 
  speed = 10, 
  size = 24,
  className = '',
  stroke = 'currentColor',
  'aria-label': ariaLabel = `Wind speed ${speed} units`
}: AnimatedIcon) {

  const pathVariants = {
    start: {
      pathLength: 0,
      opacity: 0,
    },
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.85,
          repeat: 2,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5
        }
      }
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      className={`windspeed-icon ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Top wind gust */}
      <motion.path
        d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        fill={"none"}

        className="wind-path"
      />
      {/* Middle wind gust */}
      <motion.path
        d="M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={"none"}
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        className="wind-path"
      />
      {/* Bottom wind gust */}
      <motion.path
        d="M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={"none"}
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        className="wind-path"
      />
    </svg>
  );
}