export default function OutfitRecommendationSkeletonLoader() {
  return (
    <div
      data-testid="outfit-recommendation-skeleton"
      className="bg-background p-4 rounded-md flex flex-row items-start gap-4 animate-pulse w-full"
    >
      <div className="m-2">
        <div className="h-[4em] w-[4em] bg-muted rounded border-red gradient-border" />
      </div>

      <div className="w-1/2 mt-8">
        <div className="h-5 w-1/4 bg-muted rounded mb-4" />
        <div className="h-5 w-3/4 bg-muted rounded" />
      </div>
    </div>
  );
}
