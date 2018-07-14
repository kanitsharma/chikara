import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

export default props => (
  <div className="nav_container">
    <div className="nav_left">Mangaflux</div>
    <div className="nav-menu">
      <Link to="/">HOME</Link>
      <Link to="/browse">BROWSE</Link>
      <Link to="/about">ABOUT</Link>
    </div>
  </div>
);
