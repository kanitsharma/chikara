import React from "react";
import "./mangacard.css";
const BASE_URL = "http://cdn.mangaeden.com/mangasimg/";

export default ({ imgUrl, title }) => (
  <div className="manga_card">
    <img src={`${BASE_URL}${imgUrl}`} />
    <div>{title}</div>
  </div>
);
