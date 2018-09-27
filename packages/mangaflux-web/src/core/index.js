import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import Nav from "../components/nav";
import Loader from "../containers/loader";
import Home from "../containers/home";

const Browse = Loadable({
  loader: () => import("../containers/browse"),
  loading: () => (
    <div className="main_layout">
      <Loader />
    </div>
  )
});

const Info = Loadable({
  loader: () => import("../containers/info"),
  loading: () => (
    <div className="main_layout">
      <Loader />
    </div>
  )
});

const Chapter = Loadable({
  loader: () => import("../containers/chapter"),
  loading: () => (
    <div className="main_layout">
      <Loader />
    </div>
  )
});

export const Core = Store => {
  const render = () => {
    ReactDOM.render(
      <Provider store={Store}>
        <div className="main_layout">
          <Nav />
          <Loader />
          <Router>
            <Home path="/" />
            <Browse path="/browse" />
            <Info path="/info/:mangaId" />
            <Chapter path="/chapter/:chapterId" />
          </Router>
        </div>
      </Provider>,
      document.getElementById("root")
    );
  };

  if (module.hot) {
    module.hot.accept("../containers/home", () => {
      render();
    });
  }

  render();
};
