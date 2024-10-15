import clsx from "clsx";
import { TemperatureRangeProps } from "src/types/types";

export default function TemperatureRange({ tempMin, tempMax, units }: TemperatureRangeProps) {
    return (
      <div className="flex justify-between items-center w-full bg-gray-100 p-2 rounded-md text-black">
        <div className="flex items-center gap-2">
          <span className="uppercase">LO</span>
          <div>
            {/* <p className="text-sm text-gray-600">Low</p> */}
            <p className={clsx("text-md font-bold", tempMin < 0 ? "text-blue-500" : "text-black")}>
              {Math.round(tempMin)}°{units === 'imperial' ? 'F' : 'C'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase">HI</span>
          <div>
            {/* <p className="text-sm text-gray-600">High</p> */}
            <p className={clsx("text-md font-bold", tempMax > 30 ? "text-red-500" : "text-black")}>
              {Math.round(tempMax)}°{units === 'imperial' ? 'F' : 'C'}
            </p>
          </div>
        </div>
      </div>
    );
  };