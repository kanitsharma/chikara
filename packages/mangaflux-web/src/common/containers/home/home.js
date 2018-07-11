import React from "react";
import "./home.css";
import { lifecycle } from "recompose";

const withInitData = lifecycle({
  componentDidMount() {
    this.props.fetchLatest();
  }
});

const Home = props => (
  <div className="home_container">
    <div className="nav_container">
      <div className="nav_left">Mangaflux</div>
      <div className="nav-menu">
        <div>HOME</div>
        <div>BROWSE</div>
        <div>ABOUT</div>
      </div>
    </div>
    {props.mangaList.map(x => <div>{x.a}</div>)}
  </div>
);

export default withInitData(Home);
