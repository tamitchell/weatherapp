import clsx from "clsx";
import { memo } from "react";
import Logo from "src/icons/Logo";
import { baseStyles } from "src/styles/styles";
import { Units } from "src/types/types";
import Search from "../Search/Search";
import UnitsToggle from "../UnitsToggle";

export default memo(function LeftPanelHeader({ 
    units, 
    onUnitChange 
  }: { 
    units: Units; 
    onUnitChange: () => void; 
  }) {
    console.log('PanelHeader render');
    return (
      <>
        <div className={clsx(
          'flex items-center justify-start space-between flex-wrap',
          'w-full text-black h-[3.5em]'
        )}>
          <Logo width={250} height={18} />
          <UnitsToggle units={units} onToggle={onUnitChange} />
        </div>
        <div className={clsx(baseStyles.flexCenter, 'w-full text-black h-[3.5em]')}>
          <Search />
        </div>
      </>
    );
  });