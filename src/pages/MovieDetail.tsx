import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MovieDetail } from "../features/movies/types";
import { moviesApi } from "../api/moviesApi";
import { MovieDetailSkeleton } from "../components/MovieDetailSkeleton";
import { MovieNotFound } from "../components/MovieDetailNotFound";
import { IMAGE_URL } from "../utils/constants";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const fetchDetail = async () => {
      try {
        const data = await moviesApi.getMovieDetail(id!);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie detail", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <MovieDetailSkeleton />;
  if (!movie) return <MovieNotFound />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded-lg shadow-md object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500 text-sm italic">{movie.tagline}</p>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
            <span>📅 {movie.release_date}</span>
            <span>⏱️ {movie.runtime} minutes</span>
            <span>
              ⭐ {movie.vote_average} / 10 ({movie.vote_count} votes)
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">Languages:</span>{" "}
            {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
          </div>

          <div className="mt-1 text-sm text-gray-600">
            <span className="font-medium">Production Country:</span>{" "}
            {movie.production_countries.map((c) => c.name).join(", ")}
          </div>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-600 underline text-sm"
            >
              Visit Official Site →
            </a>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-800 leading-relaxed">{movie.overview}</p>
      </div>

      {movie.production_companies.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Production Companies</h2>
          <div className="flex flex-wrap gap-4">
            {movie.production_companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded-md"
              >
                {company.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                    alt={company.name}
                    className="w-10 h-auto object-contain"
                  />
                )}
                <span>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
