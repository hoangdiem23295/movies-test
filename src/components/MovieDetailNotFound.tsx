import { NO_MOVIE_DATA } from "../utils/constants";

export const MovieNotFound = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Movie Not Found</h2>
      <p className="text-gray-500 mt-2">
        We couldn't find the movie you're looking for.
      </p>
      <img
        src={NO_MOVIE_DATA}
        alt="Not found"
        className="mx-auto mt-6 rounded-md shadow-md"
      />
    </div>
  );
};
