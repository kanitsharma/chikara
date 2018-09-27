import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import Nav from "../components/nav";
import Loader from "../containers/loader";
import Home from "../containers/home";

export const Core = Store => {
  const render = () => {
    ReactDOM.render(
      <Provider store={Store}>
        <div className="main_layout">
          <Nav />
          <Loader />
          <Router>
            <Home path="/" />
          </Router>
          {/* <Route exact path="/browse" component={Browse} />
            <Route exact path="/info/:mangaId" component={Info} />
            <Route exact path="/chapter/:chapterId" component={Chapter} /> */}
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
