import { createAction } from "@reduxjs/toolkit";


// export const newsFetching = createAction("NEWS_FETCHING");
// export const newsFetched = createAction("NEWS_FETCHED");
// export const newsFetchingError = createAction("NEWS_FETCHING_ERROR");
export const newsCreated = createAction("NEWS_CREATED");
export const filtersFetching = createAction("FILTERS_FETCHING");
export const filtersFetched = createAction("FILTERS_FETCHED");
export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");
export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED");
export const newsDeleted = createAction("NEWS_DELETED");
