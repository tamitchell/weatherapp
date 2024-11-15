export default function OutfitRecommendationSkeletonLoader() {
  return (
    <div
      data-testid="outfit-recommendation-skeleton"
      className="bg-white p-4 rounded-md flex items-start gap-3 animate-pulse"
    >
      <div className="w-8 h-8 bg-gray-200 rounded" />
      <div className="flex-1">
        <div className="h-6 w-48 bg-gray-200 rounded m-2" />

        <div className="space-y-2 gap-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-5 h-5 bg-gray-200 rounded" />
    </div>
  );
}
