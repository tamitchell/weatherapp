import Icon from '../Icon/Icon';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from 'src/context/ThemeProvider/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={clsx(
        "h-[2.5em] w-[2.5em] border-border border-2 flex justify-center items-center",
        "rounded-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        "hover:bg-accent hover:text-accent-foreground",
        "bg-background text-foreground",
        "transition-colors"
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      whileTap={{ scale: 0.95 }}
      data-testid="theme-toggle"
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        key={theme}
      >
        <Icon
          name={theme === 'dark' ? 'theme_sun' : 'theme_moon'}
          size={24}
          fill="currentColor"
        />
      </motion.span>
    </motion.button>
  );
}