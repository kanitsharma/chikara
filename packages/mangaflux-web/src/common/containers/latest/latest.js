import React from "react";
import { setPropTypes } from "recompose";
import MangaCard from "../../components/mangacard";
import p from "prop-types";
import "./latest.css";

const Latest = props => (
  <div className="latest_container">
    {props.mangaList.map(x => <MangaCard imgUrl={x.im} title={x.t} />)}
  </div>
);

const withPropType = setPropTypes({
  mangaList: p.array
});

export default withPropType(Latest);
