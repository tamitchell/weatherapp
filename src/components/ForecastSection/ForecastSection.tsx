import OutfitRecommendation from '../OutfitRecommendation/OutfitRecommendation';
import WeeklyForecast from '../WeeklyForecast/WeeklyForecast';

export default function ForecastSection(): JSX.Element {
  return (
    <div className="w-full h-full p-4 flex flex-col overflow-x-hidden">
      <div className="mb-4 mt-auto">
        <OutfitRecommendation />
      </div>
      <WeeklyForecast />
    </div>
  );
}
