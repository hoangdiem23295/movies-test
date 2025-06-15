import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DiscoverMoviesResponse } from "./types";
import { moviesApi } from "../../api/moviesApi";
import {
  DiscoverMoviesPayload,
  fetchMoviesFailure,
  fetchMoviesRequest,
  fetchMoviesSuccess,
} from "./moviesSlice";

export function* fetchDiscoverMoviesSaga(
  action: PayloadAction<DiscoverMoviesPayload>
) {
  try {
    const { page = 1, minDate, maxDate, type, searchTerm } = action.payload;

    const response: DiscoverMoviesResponse = yield call(
      moviesApi.discoverMovies,
      {
        page,
        minDate,
        maxDate,
        type,
        searchTerm,
      }
    );

    yield put(fetchMoviesSuccess(response.results));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
  }
}
export function* movieWatcherSaga() {
  yield takeLatest(fetchMoviesRequest.type, fetchDiscoverMoviesSaga);
}
