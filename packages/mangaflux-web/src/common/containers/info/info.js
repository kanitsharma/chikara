import React from 'react';
import { withRouter } from 'react-router-dom';
import { lifecycle, compose } from 'recompose';
import './info.css';
const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

const Info = ({
  currentInfo: {
    title,
    image,
    artist,
    author,
    chapters_len,
    released,
    categories,
    status,
    description,
    chapters,
  },
  showLoader,
  history,
}) => (
  <div className={showLoader ? 'info_container blur' : 'info_container'}>
    <div>
      <div className="title-container">
        <div className="info-meta">
          <div>
            <div
              className="info-tags back-button"
              onClick={_ => history.push('/')}
            >
              <div>Back</div>
            </div>
            <div className="info-title">{title}</div>
            <div className="info-meta-data">Artist: {artist}</div>
            <div className="info-meta-data">Author: {author}</div>
            <div className="info-meta-data">No of chapters: {chapters_len}</div>
            <div className="info-meta-data">Released on: {released}</div>
            <div className="info-meta-data">
              Status: {status === 1 ? 'Ongoing' : 'Finished'}
            </div>
          </div>
          <div className="info-tags">
            {categories && categories.map(x => <div>{x}</div>)}
          </div>
        </div>
        <div className="info-title-image">
          <img alt="" src={`${BASE_URL}${image}`} />
        </div>
      </div>
    </div>
    <div className="info-description">
      <div className="info-description-title">Description</div>
      {description}
    </div>
    <div className="chapters-container">
      <div className="info-description-title">Chapters</div>
      <div>
        {chapters &&
          chapters.map(
            x =>
              !(Number(x[0]) === x[0] && x[0] % 1 !== 0) && (
                <div
                  className="chapter"
                  onClick={_ => history.push(`/chapter/${x[3]}`)}
                >
                  <div className="chapter_no">{x[0]}</div>
                  <div className="chapter_name">{x[2]}</div>
                </div>
              ),
          )}
      </div>
    </div>
  </div>
);

const withLifeCycle = lifecycle({
  componentWillMount() {
    this.props.fetchInfo(this.props.match.params.mangaId);
  },
});

export default compose(
  withLifeCycle,
  withRouter,
)(Info);
