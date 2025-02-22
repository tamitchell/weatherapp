export const SkeletonLeftPanelLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-32 bg-muted rounded"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-8 bg-muted rounded w-1/4"></div>
        <div className="h-8 bg-muted rounded w-1/4"></div>
        <div className="h-8 bg-muted rounded w-1/4"></div>
      </div>
    </div>
  );
};
