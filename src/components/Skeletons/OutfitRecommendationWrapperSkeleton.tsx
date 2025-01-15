export default function OutfitRecommendationWrapperSkeleton() {
  return (
    <div
      data-testid="outfit-recommendation-wrapper-skeleton"
      className="animate-pulse flex flex-col gap-4 "
    >
      <div className="h-8 w-48 bg-muted hover:bg-muted/90 rounded"></div>

      <div className="bg-muted hover:bg-muted/90 p-4 rounded-md h-[7em] w-full"></div>
    </div>
  );
}
