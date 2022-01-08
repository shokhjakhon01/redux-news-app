import React from "react";
import { useState } from "react";
import { useHttp } from "./../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { newsCreated } from "../components/NewList/news_slice";

function NewsAddForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { filters, filterLoadingStatus } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newsNews = { id: v4(), name, description, category };
    request("http://localhost:3001/news", "POST", JSON.stringify(newsNews))
      .then((res) => console.log("success"))
      .then(dispatch(newsCreated(newsNews)))
      .catch((err) => console.log(err));

    setName("");
    setCategory("");
    setDescription("");
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option value="">Loading Options</option>;
    } else if (status === "error") {
      return <option value="">Error Options</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === "All") return;
        return <option key={name} value={name}>{label}</option>
      });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name for News
        </label>
        <input
          type="text"
          name="name"
          required
          className="form-control"
          id="name"
          placeholder="What is name of news?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Description
        </label>
        <textarea
          type="text"
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="What is your news about?"
          style={{ height: "120px", resize: "none" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Choose category of news
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-select"
          id="category"
          name="category"
        >
          <option>Category of news...</option>
          {renderFilters(filters, filterLoadingStatus)}
        </select>
      </div>
      <button type="submit" className="btn shadow-lg text-light btn-dark w-100">
        Create News
      </button>
    </form>
  );
}

export default NewsAddForm;
