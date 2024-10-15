import clsx from "clsx";
import { TemperatureRangeProps } from "src/types/types";

export default function TemperatureRange({ tempMin, tempMax, units }: TemperatureRangeProps) {
    return (
      <div className="flex justify-between items-center w-full bg-gray-100 p-2 rounded-md text-black">
        <div className="flex items-center gap-2" data-testid="low-temp-container">
          <span className="uppercase" data-testid="low-temp-label">LO</span>
          <div>
            {/* <p className="text-sm text-gray-600">Low</p> */}
            <p className={clsx("text-md font-bold", tempMin < 0 ? "text-blue-500" : "text-black")} data-testid="low-temp-value">
              {Math.round(tempMin)}°{units === 'imperial' ? 'F' : 'C'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2" data-testid="high-temp-container">
          <span className="uppercase" data-testid="high-temp-label">HI</span>
          <div>
            {/* <p className="text-sm text-gray-600">High</p> */}
            <p className={clsx("text-md font-bold", tempMax > 30 ? "text-red-500" : "text-black")} data-testid="high-temp-value">
              {Math.round(tempMax)}°{units === 'imperial' ? 'F' : 'C'}
            </p>
          </div>
        </div>
      </div>
    );
  };