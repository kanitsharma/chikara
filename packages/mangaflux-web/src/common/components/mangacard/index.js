import React from 'react';
import { withRouter } from 'react-router-dom';
import { withState, compose } from 'recompose';
import './mangacard.css';
import Placeholder from './placeholder.png';
const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

const Loader = _ => <div className="lds-dual-ring custom" />;

const Mangacard = ({
  imgUrl,
  title,
  id,
  setId,
  history,
  loading,
  stopLoader,
}) => (
  <div
    className="manga_card"
    onClick={_ => {
      setId(id);
      history.replace('/info');
    }}
  >
    {loading && <Loader />}
    <img
      alt=""
      src={imgUrl ? `${BASE_URL}${imgUrl}` : Placeholder}
      onLoad={_ => stopLoader(_ => false)}
    />
    <div>{title}</div>
  </div>
);

const stateful = withState('loading', 'stopLoader', true);

export default compose(
  stateful,
  withRouter,
)(Mangacard);
