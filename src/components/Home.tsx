'use client';

import clsx from 'clsx';
import LeftPanel from './LeftPanel/LeftPanel';
import ForecastSection from './ForecastSection/ForecastSection';

export default function Home() {
  return (
    <div className={clsx('min-h-screen w-full', 'flex flex-col sm:flex-row')}>
      <div
        className={clsx(
          'w-full min-w-[320px]',
          'sm:w-1/2 md:w-1/3',
          'sm:max-w-[425px]',
          'md:max-w-[30vw]',
          'md:min-h-screen',
          'bg-background dark:bg-background'
        )}
      >
        <LeftPanel />
      </div>
      <div
        className={clsx(
          'w-full h-full',
          'sm:flex-1',
          'md:min-h-screen',
          'overflow-y-auto',
          'bg-background-secondary dark:bg-background-secondary'
        )}
      >
        <ForecastSection />
      </div>
    </div>
  );
}
