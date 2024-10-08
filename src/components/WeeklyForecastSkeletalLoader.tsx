import clsx from "clsx";

export default function WeeklyForecastSkeletonLoader(): JSX.Element {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between overflow-x-hidden animate-pulse">
        <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="flex self-end space-x-4 overflow-x-scroll w-full">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-gray-200 min-w-[250px] h-[320px] p-2 flex flex-col justify-between rounded-lg shadow-lg">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="flex flex-col items-center my-4">
                <div className="w-14 h-14 bg-gray-300 rounded-full mb-2"></div>
                <div className="h-8 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className={clsx(
                "flex justify-between mt-4 bg-gray-300 p-2 rounded-lg",
                "h-20 w-full"
              )}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-7 h-7 bg-gray-400 rounded-full mb-1"></div>
                    <div className="h-3 w-8 bg-gray-400 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };