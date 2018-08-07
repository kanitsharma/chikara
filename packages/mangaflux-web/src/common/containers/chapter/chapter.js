import React from 'react';
import { lifecycle, compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import './chapter.css';

const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

const Chapter = ({ images }) => (
  <div className="home_container">
    {images.map(x => (
      <div className="chapter_image">
        <img src={`${BASE_URL}${x[1]}`} />
      </div>
    ))}
  </div>
);

const withLifeCycle = lifecycle({
  componentWillMount() {
    this.props.fetchChapter(this.props.match.params.chapterId);
  },
});

export default compose(
  withLifeCycle,
  withRouter,
)(Chapter);
