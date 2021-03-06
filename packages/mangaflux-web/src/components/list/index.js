import React from 'react';
import { setPropTypes } from 'recompose';
import MangaCard from '../../components/mangacard';
import p from 'prop-types';
import './list.css';

const List = ({ list }) => (
  <div className="latest_container">
    {list.map(x => <MangaCard imgUrl={x.im} title={x.t} id={x.i} key={x.i} />)}
  </div>
);

const withPropType = setPropTypes({
  list: p.array,
});

export default withPropType(List);
