import { createReducer } from "@reduxjs/toolkit";
import {
  newsFetching,
  newsFetched,
  newsFetchingError,
  newsCreated,
  newsDeleted,
} from "../actions";
const initialState = {
  news: [],
  newsLoadingStatus: "sam",
};

const news = createReducer(
  initialState,
  {
    [newsFetching]: (state) => {
      state.newsLoadingStatus = "loading";
    },
    [newsFetched]: (state, action) => {
      state.newsLoadingStatus = "sam";
      state.news = action.payload;
    },
    [newsFetchingError]: (state) => {
      state.newsLoadingStatus = "error";
    },
    [newsCreated]: (state, action) => {
      state.news.push(action.payload);
    },
    [newsDeleted]: (state, action) => {
      state.news = state.news.filter((s) => s.id !== action.payload);
    },
  },
  [],
  (state) => state
);

export default news;
