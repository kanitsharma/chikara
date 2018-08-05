import React from 'react';
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
}) => (
  <div className={showLoader ? 'info_container blur' : 'info_container'}>
    <div>
      <div className="title-container">
        <div className="info-meta">
          <div>
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
              x[2] && (
                <div className="chapter">
                  <div className="chapter_no">{x[0]}</div>
                  <div className="chapter_name">{x[2]}</div>
                </div>
              ),
          )}
      </div>
    </div>
  </div>
);

export default Info;
