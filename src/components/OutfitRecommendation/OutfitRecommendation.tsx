import useOutfitRecommendationQuery, {
  OutfitRecommendationQueryProps,
} from 'src/hooks/queries/useOutfitRecommendationQuery/useOutfitRecommendationQuery';
import Icon from '../Icon/Icon';
import WordReveal from '../WordReveal/WordReveal';
import { memo } from 'react';
import OutfitRecommendationSkeletonLoader from '../Skeletons/OutfitRecommendationSkeletonLoader';
import clsx from 'clsx';
import { themeStyles } from 'src/styles/styles';

type OutfitRecommendationProps = OutfitRecommendationQueryProps;

export default memo(function OutfitRecommendation({
  chanceOfPrecip,
  currentWeather,
  forecast,
  units,
}: OutfitRecommendationProps) {
  const { data, isLoading, error } = useOutfitRecommendationQuery({
    chanceOfPrecip,
    currentWeather,
    forecast,
    units,
  });

  if (isLoading) return <OutfitRecommendationSkeletonLoader />;

  return (
    <div className="w-full flex flex-col gap-2">
       <h4
              className={clsx(themeStyles.text, 'text-lg font-semibold w-full')}
              data-testid="forecast-heading"
            >
          {"Today's Clothing Tip"}
          </h4>
    <div
      data-testid="outfit-recommendation"
      className={clsx(
        themeStyles.card,
        ' p-4 rounded-md text-foreground flex flex-row items-center gap-4 p-4'
      )}
    >
      <div className="m-2 bg-foreground dark:bg-muted-foreground rounded-md">
        <button
          className={clsx(
            'dark:text-secondary-foreground text-primary-foreground w-[4em] h-[4em] self-start p-4'
          )}
        >
          <Icon name="tshirt" size={32} />
        </button>
      </div>

      <div className="">
        {error || !data ? (
          <p>Unable to load clothing recommendation</p>
        ) : (
          <WordReveal text={data.recommendation} />
        )}
      </div>
    </div>
    </div>

  );
});
