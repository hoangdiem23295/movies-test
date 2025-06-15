import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "./types";

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

export interface DiscoverMoviesPayload {
  page?: number;
  minDate: string;
  maxDate: string;
  type?: "now_playing" | "top_rated";
  searchTerm?: string;
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMoviesRequest: (
      state,
      _action: PayloadAction<DiscoverMoviesPayload>
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.loading = false;
    },
    fetchMoviesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } =
  movieSlice.actions;

export default movieSlice.reducer;
