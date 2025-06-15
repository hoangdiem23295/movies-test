const MovieCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse">
      <div className="w-full h-[300px] bg-gray-300 rounded mb-2" />
      <div className="h-5 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

export default MovieCardSkeleton;
