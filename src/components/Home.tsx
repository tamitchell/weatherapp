'use client';

import clsx from 'clsx';
import LeftPanel from './LeftPanel/LeftPanel';
import WeeklyForecast from './WeeklyForecast/WeeklyForecast';

/**
 * TODO:
 * - Clean up routes.ts, are all headers really needed there?
 * - add Sunrise/Sunset calculation
 * - add daily quote
 * - what to put in giant space.
 * - Add cypress integration testing
 * - Consider react query to manage caching and refetches
 * - instead of refetch, convert temp values
 * - add error state of weekly forecast
 * - add micro animations
 */

export default function Home() {
  return (
    <div className={clsx('min-h-screen w-full', 'flex flex-col sm:flex-row')}>
      <div
        className={clsx(
          'w-full min-w-[320px]',
          'sm:w-1/2 md:w-1/3',
          'sm:max-w-[425px]',
          'md:max-w-[30vw]',
          'md:min-h-screen'
        )}
      >
       <LeftPanel 
        />
      </div>
      <div
        className={clsx(
          'w-full',
          'sm:flex-1',
          'md:min-h-screen',
          'overflow-y-auto',
          'bg-charcoal'
        )}
      >
     <WeeklyForecast
        />
      </div>
    </div>
  );
}
