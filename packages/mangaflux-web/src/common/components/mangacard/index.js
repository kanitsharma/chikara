import React from 'react';
import { withRouter } from 'react-router-dom';
import './mangacard.css';
import Placeholder from './placeholder.png';
const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

const Mangacard = ({ imgUrl, title, id, setId, history }) => (
  <div
    className="manga_card"
    onClick={_ => {
      setId(id);
      history.replace('/info');
    }}
  >
    <img alt="" src={imgUrl ? `${BASE_URL}${imgUrl}` : Placeholder} />
    <div>{title}</div>
  </div>
);

export default withRouter(Mangacard);
