import React from 'react';
import './mangacard.css';
import Placeholder from './placeholder.png';
const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

export default ({ imgUrl, title }) => (
  <div className="manga_card">
    <img src={imgUrl ? `${BASE_URL}${imgUrl}` : Placeholder} />
    <div>{title}</div>
  </div>
);
