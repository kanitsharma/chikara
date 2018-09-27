import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import Nav from "../components/nav";
import Loader from "../containers/loader";
import Home from "../containers/home";
import Browse from "../containers/browse";
import Info from "../containers/info";
import Chapter from "../containers/chapter";

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
