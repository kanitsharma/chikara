import React from 'react';
import './browse.css';

class Browse extends React.Component {
  state = {
    searchText: '',
  };

  render() {
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
      </div>
    );
  }
}

export default Browse;
