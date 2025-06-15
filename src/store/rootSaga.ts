import { all } from "redux-saga/effects";
import { movieWatcherSaga } from "../features/movies/moviesSaga";

export default function* rootSaga() {
  yield all([movieWatcherSaga()]);
}
