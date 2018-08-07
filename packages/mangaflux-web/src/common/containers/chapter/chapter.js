import React from 'react';
import { lifecycle, compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { LazyImage } from 'react-lazy-images';
import './chapter.css';

const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';
const Loader = _ => <div className="lds-dual-ring custom" />;

const Chapter = ({ images }) => (
  <div className="home_container">
    {images.map(x => (
      <div className="chapter_image">
        <LazyImage
          src={`${BASE_URL}${x[1]}`}
          alt="Image not available"
          placeholder={({ imageProps, ref }) => (
            <img ref={ref} alt={imageProps.alt} style={{ width: '100%' }} />
          )}
          debounceDurationMs={300}
          actual={({ imageProps }) => (
            <img {...imageProps} style={{ width: '100%' }} />
          )}
          loading={_ => <Loader />}
        />
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
