import clsx from 'clsx';
import { themeStyles } from 'src/styles/styles';
import { TemperatureRangeProps } from 'src/types/types';

export default function TemperatureRange({
  tempMin,
  tempMax,
  units,
}: TemperatureRangeProps) {
  return (
    <div className={clsx(themeStyles.complementaryOffset, "flex justify-between items-center w-full p-2 rounded-md")}>
      <div className="flex items-center gap-2" data-testid="low-temp-container">
        <span className="uppercase" data-testid="low-temp-label">
          LO
        </span>
        <div>
          {/* <p className="text-sm text-muted-foreground">Low</p> */}
          <p
            className={clsx(
              'text-md font-bold',
            )}
            data-testid="low-temp-value"
          >
            {Math.round(tempMin)}°{units === 'imperial' ? 'F' : 'C'}
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-2"
        data-testid="high-temp-container"
      >
        <span className="uppercase" data-testid="high-temp-label">
          HI
        </span>
        <div>
          {/* <p className="text-sm text-muted-foreground">High</p> */}
          <p
            className={clsx(
              'text-md font-bold',
            )}
            data-testid="high-temp-value"
          >
            {Math.round(tempMax)}°{units === 'imperial' ? 'F' : 'C'}
          </p>
        </div>
      </div>
    </div>
  );
}
