import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WeatherTransitionProps {
  children: ReactNode;
  locationKey: string;
  className?: string;
}

export function ForecastTransition({
  children,
  locationKey,
  className = '',
}: WeatherTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          mass: 0.5,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
