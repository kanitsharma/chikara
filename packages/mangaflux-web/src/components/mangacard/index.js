import React from "react";
import { navigate } from "@reach/router";
import { withState, compose } from "recompose";
import "./mangacard.css";
import Placeholder from "./placeholder.png";
const BASE_URL = "http://cdn.mangaeden.com/mangasimg/";

const Loader = _ => <div className="lds-dual-ring custom" />;

const Mangacard = ({ imgUrl, title, id, loading, stopLoader }) => (
  <div className="manga_card" onClick={_ => navigate(`/info/${id}`)}>
    {loading && <Loader />}
    <img
      alt=""
      src={imgUrl ? `${BASE_URL}${imgUrl}` : Placeholder}
      onLoad={_ => stopLoader(_ => false)}
    />
    <div>{title}</div>
  </div>
);

const stateful = withState("loading", "stopLoader", true);

export default compose(stateful)(Mangacard);
