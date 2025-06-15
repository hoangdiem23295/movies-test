import { DiscoverMoviesPayload } from "../features/movies/moviesSlice";
import { DiscoverMoviesResponse, MovieDetail } from "../features/movies/types";
import { tmdbApi } from "./tmdbApi";

export const moviesApi = {
  discoverMovies: ({
    page = 1,
    minDate,
    maxDate,
    type,
    searchTerm,
  }: DiscoverMoviesPayload): Promise<DiscoverMoviesResponse> => {
    const isSearching = searchTerm && searchTerm.trim() !== "";

    const endpoint = isSearching ? "/search/movie" : `/movie/${type}`;

    const params: Record<string, any> = {
      language: "en-US",
      page,
    };

    if (isSearching) {
      params.query = searchTerm;
    } else {
      // params["release_date.gte"] = minDate;
      // params["release_date.lte"] = maxDate;
    }

    return tmdbApi.get<DiscoverMoviesResponse>(endpoint, { params });
  },
  getMovieDetail: (id: string | number): Promise<MovieDetail> => {
    return tmdbApi.get<MovieDetail>(`/movie/${id}`, {
      params: {
        language: "en-US",
      },
    });
  },
};
