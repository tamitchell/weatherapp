//Tailwindcss

import clsx from 'clsx';

export const baseStyles = {
  container: 'p-4 m-4 shadow-md',
  rounded: 'rounded-full',
  centeredText: 'text-center',
  flexCenter: 'flex items-center justify-center',
  flexStart: 'flex items-center justify-start',
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row',
  bgTransparent: 'bg-transparent',
  scroll: 'overflow-x-auto',
  transition: 'transition-transform hover:scale-105',
  marginTop: 'mt-4',
};

export const textStyles = {
  title: 'font-montserrat text-lg',
  regular: 'font-raleway text-base',
  largeTemp: 'text-[9vh]',
  date: 'mt-12 mb-8',
};

export const buttonStyles = {
  base: 'w-[25vw] h-[25vw] max-w-[260px] max-h-[260px] border border-whitesmoke',
  hover: 'hover:shadow-lg',
  focus: 'focus:bg-[rgba(255,255,255,0.15)]',
};

export const inputStyles = {
  searchInput:
    'border border-whitesmoke text-primary-foregroundsmoke bg-transparent p-2 w-full h-12 pr-6 bg-no-repeat bg-right focus:outline-none',
};

export const imageStyles = {
  weatherIcon: 'w-[35vw] max-w-[200px] min-w-[130px] m-4',
  detailIcon: 'w-8 h-8 mr-2',
};

export const weatherStyles = {
  component: clsx(baseStyles.flexCol, baseStyles.marginTop),
  mainWeather: clsx(
    'relative p-4 w-full h-[60vw] max-w-[500px] max-h-[250px] text-center bg-[rgba(255,255,255,0.15)] shadow-sm',
    baseStyles.flexRow
  ),
  mainImg: clsx(imageStyles.weatherIcon), // Using image style for main image
  temp: 'text-[9vh] m-2', // Large temperature display
  summary:
    'absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  weatherDetails: clsx(baseStyles.flexRow, baseStyles.scroll),
};

export const themeStyles = {
  complementaryOffset:
    'bg-background-secondary text-foreground dark:bg-background-secondary dark:text-primary',
  text: 'text-foreground dark:text-primary',
  card: 'bg-background text-foreground dark:bg-background dark:text-primary text-foreground dark:text-primary dark:gradient-border',
  gridCard:
    'bg-background-tertiary text-foreground dark:bg-background-secondary dark:text-primary',
};

export const glassStyles = {
  card: 'glass-panel glass-panel-hover p-4 rounded-sm',
  complementaryOffset: 'glass-panel backdrop-blur-lg p-2 rounded-sm',
  interactiveCard: 'glass-panel glass-panel-hover glass-shimmer rounded-sm',
  text: 'text-foreground/90 dark:text-primary/90',
  gridCard:
    'glass-panel p-4 rounded-sm h-[clamp(130px,20vw,140px)] glass-panel-hover',
  detailsPanel:
    'glass-panel backdrop-blur-2xl rounded-2xl p-4 glass-panel-hover',
  contentPanel: 'glass-panel backdrop-blur-md p-6 rounded-xl',
};
