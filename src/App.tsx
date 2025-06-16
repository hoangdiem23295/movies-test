import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { useDebounce } from "./hooks/useDebounce";
import { fetchMoviesRequest } from "./features/movies/moviesSlice";
import { useEffect, useState } from "react";
import MovieCardSkeleton from "./components/MovieCardSkeleton";
import MovieCard from "./components/MovieCard";

type AppProps = {
  activeTab: "now_playing" | "top_rated";
  searchTerm: string;
};

function App({ activeTab, searchTerm }: AppProps) {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (!activeTab) return;
    const param = {
      page: 1,
      minDate: "2024-01-01",
      maxDate: "2025-12-31",
      type: activeTab,
      searchTerm:
        debouncedSearchTerm.trim() !== "" ? debouncedSearchTerm : undefined,
    };

    dispatch(fetchMoviesRequest({ ...param }));
  }, [dispatch, activeTab, debouncedSearchTerm]);

  return (
    <div className="">
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex justify-end gap-2 p-4">
        <button
          className={`px-4 py-2 rounded border flex items-center justify-center ${
            viewMode === "grid"
              ? "bg-[#1e293b] text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setViewMode("grid")}
          title="Grid View"
        >
          <span className="material-symbols-rounded">grid_view</span>
        </button>
        <button
          className={`px-4 py-2 rounded border flex items-center justify-center ${
            viewMode === "list"
              ? "bg-[#1e293b] text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setViewMode("list")}
          title="List View"
        >
          <span className="material-symbols-rounded">list</span>
        </button>
      </div>
      <div
        className={
          viewMode === "grid"
            ? "p-4 grid gap-4 md:grid-cols-6"
            : "p-4 flex flex-col gap-4"
        }
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} viewMode={viewMode} />
            ))}
      </div>
    </div>
  );
}

export default App;
