import React from 'react';
import './browse.css';

const Loader = _ => <div className="lds-dual-ring custom" />;

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
          <div className="not_found">No Results found :(</div>
        ) : (
          fetchedManga && (
            <div className="browse_manga_container">
              <div className="browse_title">{fetchedManga.title}</div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Browse;
