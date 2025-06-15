export const MovieDetailSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[300px] h-[450px] bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="flex gap-4 mt-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-6 bg-gray-200 rounded-full" />
            ))}
          </div>
          <div className="h-4 w-48 bg-gray-200 mt-3 rounded" />
          <div className="h-4 w-64 bg-gray-200 mt-1 rounded" />
          <div className="h-4 w-32 bg-gray-200 mt-3 rounded" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
};
