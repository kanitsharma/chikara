import React from 'react';
import './browse.css';
import NotFoundImg from './notfound.jpg';

const BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';
const Loader = _ => <div className="lds-dual-ring browse-loader" />;

class Browse extends React.Component {
  state = {
    searchText: '',
  };

  render() {
    const { smallLoader, notFound, fetchedManga } = this.props;
    return (
      <div className="home_container">
        <textarea
          className="searchbar"
          placeholder="Search Manga"
          value={this.state.searchText}
          onChange={e => {
            this.setState({ searchText: e.target.value }, _ => {
              this.props.searchManga(this.state.searchText);
            });
          }}
        />
        {smallLoader && <Loader />}
        {notFound ? (
          <div className="not_found">
            <img src={NotFoundImg} />
            <div>No Results found :(</div>
          </div>
        ) : (
          fetchedManga && (
            <div className="browse_manga_container">
              <div className="title-container">
                <div className="info-meta">
                  <div>
                    <div className="info-title">{fetchedManga.title}</div>
                    <div className="desc">{fetchedManga.description}</div>
                  </div>
                  <div className="info-tags">
                    {fetchedManga.categories.map(x => <div>{x}</div>)}
                  </div>
                </div>
                <div className="info-title-image">
                  <img alt="" src={`${BASE_URL}${fetchedManga.image}`} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Browse;
