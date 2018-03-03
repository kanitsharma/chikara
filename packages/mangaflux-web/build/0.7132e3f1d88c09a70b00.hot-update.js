exports.id = 0;
exports.modules = {

/***/ "./src/server/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_containers_App__ = __webpack_require__("./src/common/containers/App.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_store_configureStore__ = __webpack_require__("./src/common/store/configureStore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_api_counter__ = __webpack_require__("./src/common/api/counter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_qs__ = __webpack_require__("qs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_serialize_javascript__ = __webpack_require__("serialize-javascript");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_serialize_javascript__);
var _jsxFileName = '/home/rajatsharma/chikara/packages/mangaflux-web/src/server/index.js';










var assets = __webpack_require__("./build/assets.json");

var server = __WEBPACK_IMPORTED_MODULE_4_express___default()();

server.disable('x-powered-by').use(__WEBPACK_IMPORTED_MODULE_4_express___default.a.static("/home/rajatsharma/chikara/packages/mangaflux-web/public")).get('/*', function (req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_5__common_api_counter__["a" /* fetchCounter */])(function (apiResult) {
    // Read the counter from the request, if provided
    var params = __WEBPACK_IMPORTED_MODULE_6_qs___default.a.parse(req.query);
    var counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    var preloadedState = { counter: counter };

    // Create a new Redux store instance
    var store = Object(__WEBPACK_IMPORTED_MODULE_3__common_store_configureStore__["a" /* default */])(preloadedState);

    // Render the component to a string
    var markup = Object(__WEBPACK_IMPORTED_MODULE_7_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"],
      { store: store, __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      },
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__common_containers_App__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      })
    ));

    // Grab the initial state from our Redux store
    var finalState = store.getState();

    res.send('<!doctype html>\n    <html lang="">\n    <head>\n        <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n        <meta charSet=\'utf-8\' />\n        <title>Mangaflux</title>\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n        ' + (assets.client.css ? '<link rel="stylesheet" href="' + assets.client.css + '">' : '') + '\n          ' + ( false ? '<script src="' + assets.client.js + '" defer></script>' : '<script src="' + assets.client.js + '" defer crossorigin></script>') + '\n    </head>\n    <body>\n        <div id="root">' + markup + '</div>\n        <script>\n          window.__PRELOADED_STATE__ = ' + __WEBPACK_IMPORTED_MODULE_8_serialize_javascript___default()(finalState) + '\n        </script>\n    </body>\n</html>');
  });
});

/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ })

};
//# sourceMappingURL=0.7132e3f1d88c09a70b00.hot-update.js.map