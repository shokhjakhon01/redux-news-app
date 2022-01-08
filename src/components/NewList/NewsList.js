import { useEffect, useCallback } from "react";
import { useHttp } from "../../hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { newsDeleted,fetchNews, selectAll } from "../../components/NewList/news_slice.js";
import Spinner from "../Spinner";
import Error from "../Error";
import NewsListItem from "../NewsListItem";
import { createSelector } from "reselect";
import "../style/news_list.css";

export default function NewsList() {
  const filteredNewsSelected = createSelector(
    (state) => state.filter.activeFilter,
    selectAll,
    (filter, news) => {
      if (filter === "All") {
        return news;
      } else {
        return news.filter((s) => s.category === filter);
      }
    }
  );

  const filteredNews = useSelector(filteredNewsSelected);
  const filterLoadingStatus = useSelector((state) => state.filterLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();
  console.log(filterLoadingStatus);

  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/news/${id}`, "DELETE")
      .then((data) => console.log(data))
      .then(dispatch(newsDeleted(id)))
      .catch((err) => dispatch("NEWS_FETCHING_ERROR"));
    //eslint-disable-next-line
  }, []);
  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filterLoadingStatus === "error") {
    return <Error />;
  }

  const renderNewsList = (arr) => {
    if (arr.length === 0) {
      return <h4 className="text-center mt-5">News Doesnt exist</h4>;
    }
    return arr
      .map(({ id, ...props }) => {
        return (
          <NewsListItem key={id} {...props} onDelete={() => onDelete(id)} />
        );
      })
      .reverse();
  };

  const element = renderNewsList(filteredNews);

  return <ul>{element}</ul>;
}
