import clsx from 'clsx';
import { memo } from 'react';
import Logo from 'src/icons/Logo';
import { baseStyles } from 'src/styles/styles';
import { Units } from 'src/types/types';
import Search from '../Search/Search';
import UnitsToggle from '../UnitsToggle/UnitsToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default memo(function LeftPanelHeader({
  units,
  onUnitChange,
}: {
  units: Units;
  onUnitChange: () => void;
}) {
  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-start space-between flex-wrap',
          'w-full text-foreground h-[3.5em]'
        )}
      >
        <Logo width={250} height={18} />
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <UnitsToggle units={units} onToggle={onUnitChange} />
        </div>
      </div>
      <div
        className={clsx(
          baseStyles.flexCenter,
          'w-full text-foreground h-[3.5em]'
        )}
      >
        <Search />
      </div>
    </>
  );
});
