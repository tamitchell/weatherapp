import React from 'react';
import { motion } from 'framer-motion';
import { Units } from '../../types/types';
import clsx from 'clsx';
import { themeStyles } from 'src/styles/styles';

interface UnitsToggleProps {
  units: Units;
  onToggle: () => void;
}

export default function UnitsToggle({ units, onToggle }: UnitsToggleProps) {
  return (
    <motion.button
      data-testid="units-toggle"
      aria-label={`Switch to ${units === 'imperial' ? 'imperial' : 'metric'} units`}
      className="ml-auto relative w-[6.5em] h-[2.5em] 
             bg-background dark:bg-background-tertiary
             border-2 border-foreground dark:border-primary
             rounded-sm p-1 focus:outline-none"
      onClick={onToggle}
    >
      <motion.span
        className={clsx(
          'absolute left-1 top-1.5 h-6 bg-foreground dark:bg-primary rounded-sm shadow',
          units === 'imperial' ? 'w-[2em]' : 'w-[3.3em]'
        )}
        data-testid="toggle-slider"
        animate={{ x: units === 'imperial' ? 0 : 32 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
      <span
        className={clsx(
          'absolute w-[2em] left-2 top-1/2 transform -translate-y-1/2 text-xs font-bold',
          units === 'imperial'
            ? 'text-primary-foreground dark:text-background-tertiary' : themeStyles.text
        )}
      >
        US
      </span>
      <span
        className={clsx(
          'absolute w-[3.5em] right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold',
          units === 'metric'
            ? 'text-primary-foreground dark:text-background-tertiary' : themeStyles.text
        )}
      >
        Metric
      </span>
    </motion.button>
  );
}
