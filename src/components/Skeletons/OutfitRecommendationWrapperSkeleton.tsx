export default function OutfitRecommendationWrapperSkeleton() {
  return (
    <div
      data-testid="outfit-recommendation-wrapper-skeleton"
      className="animate-pulse flex flex-col gap-4 "
    >
      <div className="h-8 w-48 bg-gray-300 rounded"></div>

      <div className="bg-gray-300 p-4 rounded-md h-[7em] w-full"></div>
    </div>
  );
}
