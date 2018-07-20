/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/***/ (function(module, exports) {

module.exports = {"client":{"js":"/static/js/bundle.c2257584.js","css":"/static/css/bundle.8504e18a.css"}}

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./src/common/components/heading/heading.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".heading {\n  margin: 20px 0px;\n  margin-right: auto;\n  margin-left: 5%;\n  color: #f5a0fd;\n  font-size: 26px;\n  letter-spacing: 2px;\n  font-weight: bold;\n  font-family: 'n';\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/heading/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__heading_css__ = __webpack_require__("./src/common/components/heading/heading.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__heading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__heading_css__);



/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var title = _ref.title;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "heading" },
    title
  );
});

/***/ }),

/***/ "./src/common/components/list/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_mangacard__ = __webpack_require__("./src/common/components/mangacard/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_css__ = __webpack_require__("./src/common/components/list/list.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__list_css__);






var List = function List(_ref) {
  var list = _ref.list,
      setId = _ref.setId;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'latest_container' },
    list.map(function (x) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_mangacard__["a" /* default */], { imgUrl: x.im, title: x.t, id: x.i, key: x.i, setId: setId });
    })
  );
};

var withPropType = Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["setPropTypes"])({
  list: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.array
});

/* harmony default export */ __webpack_exports__["a"] = (withPropType(List));

/***/ }),

/***/ "./src/common/components/list/list.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".latest_container {\n  height: 370px;\n  width: 90%;\n  max-width: 1300px;\n  display: flex;\n  flex-direction: row;\n  overflow-y: auto;\n  border-radius: 10px;\n  background-color: #204591;\n  box-shadow: 5px 5px 23px rgba(0, 0, 0, 0.2);\n  margin: 10px 0px;\n}\n\n.latest_container::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #f5f5f5;\n}\n\n.latest_container::-webkit-scrollbar {\n  height: 4px;\n  background-color: #f5f5f5;\n}\n\n.latest_container::-webkit-scrollbar-thumb {\n  background-color: #cf84fd;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/loader/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loader_css__ = __webpack_require__("./src/common/components/loader/loader.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loader_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__loader_css__);



/* harmony default export */ __webpack_exports__["a"] = (function (_) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "loader-overlay" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "lds-dual-ring" })
  );
});

/***/ }),

/***/ "./src/common/components/loader/loader.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".loader-overlay {\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n\n.lds-dual-ring {\n  display: inline-block;\n  width: 64px;\n  height: 64px;\n}\n.lds-dual-ring:after {\n  content: \" \";\n  display: block;\n  width: 46px;\n  height: 46px;\n  margin: 1px;\n  border-radius: 50%;\n  border: 5px solid #fff;\n  border-color: #fff transparent #fff transparent;\n  animation: lds-dual-ring 1.2s linear infinite;\n}\n@keyframes lds-dual-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/mangacard/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mangacard_css__ = __webpack_require__("./src/common/components/mangacard/mangacard.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mangacard_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mangacard_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__placeholder_png__ = __webpack_require__("./src/common/components/mangacard/placeholder.png");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__placeholder_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__placeholder_png__);




var BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

var Mangacard = function Mangacard(_ref) {
  var imgUrl = _ref.imgUrl,
      title = _ref.title,
      id = _ref.id,
      setId = _ref.setId,
      history = _ref.history;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      className: 'manga_card',
      onClick: function onClick(_) {
        setId(id);
        history.push('/info');
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { alt: '', src: imgUrl ? '' + BASE_URL + imgUrl : __WEBPACK_IMPORTED_MODULE_3__placeholder_png___default.a }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      title
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["withRouter"])(Mangacard));

/***/ }),

/***/ "./src/common/components/mangacard/mangacard.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".manga_card {\n  margin: 10px 10px;\n  color: #fbdaf9;\n  letter-spacing: 1px;\n}\n\n.manga_card img {\n  width: 200px;\n  height: 300px;\n  border-radius: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/mangacard/placeholder.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/placeholder.f83d4416.png";

/***/ }),

/***/ "./src/common/components/nav/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_css__ = __webpack_require__("./src/common/components/nav/nav.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__nav_css__);




/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'nav_container' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'nav_left' },
      'Mangaflux'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'nav-menu' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
        { to: '/' },
        'HOME'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
        { to: '/browse' },
        'BROWSE'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
        { to: '/about' },
        'ABOUT'
      )
    )
  );
});

/***/ }),

/***/ "./src/common/components/nav/nav.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".nav_container {\n  width: 90%;\n  margin: 20px;\n  padding: 20px;\n  font-size: 18px;\n  color: #fbdaf9;\n  border-radius: 10px;\n  background-color: #204591;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-shadow: 5px 5px 23px rgba(0, 0, 0, 0.2);\n}\n\n.nav-menu {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  justify-content: center;\n}\n\n.nav-menu a {\n  cursor: pointer;\n  margin: 0px 25px;\n  font-size: 15px;\n  font-weight: bold;\n  letter-spacing: 2px;\n  color: #fbdaf9;\n  text-decoration: none;\n}\n\n.nav_left {\n  margin-right: auto;\n  font-size: 40px;\n  letter-spacing: 1px;\n  font-family: 'n';\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/browse/browse.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".home_container {\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/browse/browse.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browse_css__ = __webpack_require__("./src/common/containers/browse/browse.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browse_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__browse_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_heading__ = __webpack_require__("./src/common/components/heading/index.js");




var Browse = function Browse(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'home_container' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_heading__["a" /* default */], { title: 'Latest' })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Browse);

/***/ }),

/***/ "./src/common/containers/browse/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browse__ = __webpack_require__("./src/common/containers/browse/browse.js");




var mapStateToProps = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('');

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__browse__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/home/epic.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__futils_curried__ = __webpack_require__("./src/common/futils/curried.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");







var Latest = 'https://mangaflux-api.herokuapp.com/latest/0/20';
var Popular = 'https://mangaflux-api.herokuapp.com/list/0/20';

var fetchManga = function fetchManga(url) {
  return __WEBPACK_IMPORTED_MODULE_3_node_fetch___default()(url).then(function (res) {
    return res.json();
  });
};

var createAction$ = function createAction$(a) {
  return Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])(a));
};

var manga$ = function manga$(a) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["d" /* Map */])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["a" /* Action */])(a)), __WEBPACK_IMPORTED_MODULE_2_most__["fromPromise"], fetchManga);
};

var latest$ = manga$('FETCHED_LATEST');
var popular$ = manga$('FETCHED_POPULAR');

var sendAction$ = function sendAction$(l, p) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["c" /* Concat */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], createAction$('LOADER_OFF')), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["e" /* Merge */])(latest$(l)), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["e" /* Merge */])(popular$(p)), Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["always"])(createAction$('LOADER_ON')));
};

var fetchData = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["b" /* Chain */])(sendAction$(Latest, Popular)), Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["select"])('FETCH_INIT'));

/* harmony default export */ __webpack_exports__["a"] = (fetchData);

/***/ }),

/***/ "./src/common/containers/home/home.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".home_container {\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/home/home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_list__ = __webpack_require__("./src/common/components/list/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_css__ = __webpack_require__("./src/common/containers/home/home.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__home_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_heading__ = __webpack_require__("./src/common/components/heading/index.js");






var withInitData = Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["lifecycle"])({
  componentDidMount: function componentDidMount() {
    this.props.fetchLatest();
  }
});

var Home = function Home(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'home_container' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_heading__["a" /* default */], { title: 'Latest' }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_list__["a" /* default */], { list: props.latestList, setId: props.setId }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_heading__["a" /* default */], { title: 'Popular' }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_list__["a" /* default */], { list: props.popularList, setId: props.setId })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (withInitData(Home));

/***/ }),

/***/ "./src/common/containers/home/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__("./src/common/containers/home/home.js");





var mapStateToProps = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('home');

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchLatest: function fetchLatest() {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */])('FETCH_INIT'));
    },
    loaderOff: function loaderOff() {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */])('LOADER_OFF'));
    },
    setId: function setId(id) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */])('SET_INFO_ID', id));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__home__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/home/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__futils_createreducer__ = __webpack_require__("./src/common/futils/createreducer.js");



var ACTION_HANDLERS = {
  FETCHED_LATEST: function FETCHED_LATEST(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, {
      latestList: a.payload.data,
      showLoader: false
    });
  },
  FETCHED_POPULAR: function FETCHED_POPULAR(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, {
      popularList: a.payload.data,
      showLoader: false
    });
  },
  LOADER_OFF: function LOADER_OFF(s, _a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { showLoader: false });
  },
  LOADER_ON: function LOADER_ON(s, _a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { showLoader: true });
  }
};

var initialState = {
  latestList: [],
  popularList: [],
  showLoader: false
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__futils_createreducer__["a" /* default */])(initialState, ACTION_HANDLERS));

/***/ }),

/***/ "./src/common/containers/info/epic.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__futils_curried__ = __webpack_require__("./src/common/futils/curried.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");







var InfoAPI = 'https://www.mangaeden.com/api/manga/';

var fetchInfo = function fetchInfo(_ref) {
  var payload = _ref.payload;
  return __WEBPACK_IMPORTED_MODULE_3_node_fetch___default()(InfoAPI + payload).then(function (res) {
    return res.json();
  });
};

var info$ = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["d" /* Map */])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["a" /* Action */])('FETCHED_INFO')), __WEBPACK_IMPORTED_MODULE_2_most__["fromPromise"], fetchInfo);

var sendAction$ = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["c" /* Concat */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])('LOADER_OFF'))), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["e" /* Merge */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])('LOADER_ON'))), info$);

var fetchData = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["b" /* Chain */])(sendAction$), Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["select"])('SET_INFO_ID'));

/* harmony default export */ __webpack_exports__["a"] = (fetchData);

/***/ }),

/***/ "./src/common/containers/info/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info__ = __webpack_require__("./src/common/containers/info/info.js");




var mapStateToProps = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('home');

var mapDispatchToProps = function mapDispatchToProps(_dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__info__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/info/info.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".info_container {\n  height: 84vh;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/info/info.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info_css__ = __webpack_require__("./src/common/containers/info/info.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__info_css__);




var withInitData = Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["lifecycle"])({});

var Info = function Info(_props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'info_container' });
};

/* harmony default export */ __webpack_exports__["a"] = (withInitData(Info));

/***/ }),

/***/ "./src/common/containers/info/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__futils_createreducer__ = __webpack_require__("./src/common/futils/createreducer.js");



var ACTION_HANDLERS = {
  SET_INFO_ID: function SET_INFO_ID(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { currentId: a.payload });
  }
};

var initialState = {
  currentId: null
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__futils_createreducer__["a" /* default */])(initialState, ACTION_HANDLERS));

/***/ }),

/***/ "./src/common/containers/layout/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_nav__ = __webpack_require__("./src/common/components/nav/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home__ = __webpack_require__("./src/common/containers/home/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__browse__ = __webpack_require__("./src/common/containers/browse/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__info__ = __webpack_require__("./src/common/containers/info/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_loader__ = __webpack_require__("./src/common/components/loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__layout_css__ = __webpack_require__("./src/common/containers/layout/layout.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__layout_css__);












var Layout = function Layout(_ref) {
  var showLoader = _ref.showLoader;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'main_layout' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_nav__["a" /* default */], null),
    showLoader && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_loader__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Switch"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_5__home__["a" /* default */] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/browse', component: __WEBPACK_IMPORTED_MODULE_6__browse__["a" /* default */] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/info', component: __WEBPACK_IMPORTED_MODULE_7__info__["a" /* default */] })
    )
  );
};

var mapStateToProps = Object(__WEBPACK_IMPORTED_MODULE_3_ramda__["prop"])('home');

var mapDispatchToProps = function mapDispatchToProps(_) {
  return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Layout));

/***/ }),

/***/ "./src/common/containers/layout/layout.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".main_layout {\n  background: rgb(90, 97, 198);\n  background: radial-gradient(\n    circle,\n    rgba(90, 97, 198, 1) 12%,\n    rgba(32, 69, 145, 1) 100%\n  );\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-family: 'Roboto', sans-serif;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/epics/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__containers_home_epic__ = __webpack_require__("./src/common/containers/home/epic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_info_epic__ = __webpack_require__("./src/common/containers/info/epic.js");




var rootEpic = Object(__WEBPACK_IMPORTED_MODULE_0_redux_most__["combineEpics"])([__WEBPACK_IMPORTED_MODULE_1__containers_home_epic__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__containers_info_epic__["a" /* default */]]);

/* harmony default export */ __webpack_exports__["a"] = (rootEpic);

/***/ }),

/***/ "./src/common/futils/actionSpreader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (type, payload) {
  return { type: type, payload: payload };
});

/***/ }),

/***/ "./src/common/futils/createreducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (initialState, actionHandlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    return actionHandlers.hasOwnProperty(action.type) ? actionHandlers[action.type](state, action) : state;
  };
});

/***/ }),

/***/ "./src/common/futils/curried.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Chain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Concat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Merge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");




var Map = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_1_most__["map"]);
var Chain = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_1_most__["chain"]);
var Action = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */]);
var Concat = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_1_most__["concat"]);
var Merge = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curryN"])(2, __WEBPACK_IMPORTED_MODULE_1_most__["merge"]);

/***/ }),

/***/ "./src/common/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__containers_home_reducer__ = __webpack_require__("./src/common/containers/home/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_info_reducer__ = __webpack_require__("./src/common/containers/info/reducer.js");




var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  home: __WEBPACK_IMPORTED_MODULE_1__containers_home_reducer__["a" /* default */],
  info: __WEBPACK_IMPORTED_MODULE_2__containers_info_reducer__["a" /* default */]
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ "./src/common/store/configureStore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger__ = __webpack_require__("redux-logger");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__("./src/common/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__epics__ = __webpack_require__("./src/common/epics/index.js");







var epicMiddleware = Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["createEpicMiddleware"])(__WEBPACK_IMPORTED_MODULE_4__epics__["a" /* default */]);

var configureStore = function configureStore(preloadedState) {
  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_3__reducers__["a" /* default */], preloadedState, Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(epicMiddleware, __WEBPACK_IMPORTED_MODULE_2_redux_logger___default.a));

  if (false) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server/index.js");



if (false) {
  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
}

var port = 3000 || 3000;

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_express___default()().use(function (req, res) {
  return __WEBPACK_IMPORTED_MODULE_1__server__["a" /* default */].handle(req, res);
}).listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('> Started on port ' + port);
}));

/***/ }),

/***/ "./src/server/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_serialize_javascript__ = __webpack_require__("serialize-javascript");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_containers_layout__ = __webpack_require__("./src/common/containers/layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_store_configureStore__ = __webpack_require__("./src/common/store/configureStore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__polyfill__ = __webpack_require__("./src/server/polyfill.js");









// import qs from 'qs';


var assets = __webpack_require__("./build/assets.json");

var server = __WEBPACK_IMPORTED_MODULE_2_express___default()();

server.disable("x-powered-by").use(__WEBPACK_IMPORTED_MODULE_2_express___default.a.static("/home/kanitsharma/open-source/chikara/packages/mangaflux-web/build/public")).get("/*", function (req, res) {
  // Read the counter from the request, if provided
  // const params = qs.parse(req.query);

  // Compile an initial state
  var preloadedState = {};

  // Create a new Redux store instance
  var store = Object(__WEBPACK_IMPORTED_MODULE_7__common_store_configureStore__["a" /* default */])(preloadedState);

  // Render the component to a string
  var markup = Object(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_0_react_redux__["Provider"],
    { store: store },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_5_react_router_dom__["StaticRouter"],
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__common_containers_layout__["a" /* default */], null)
    )
  ));

  // Grab the initial state from our Redux store
  var finalState = store.getState();

  res.send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charSet='utf-8' />\n        <title>Mangaflux</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        " + (assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : "") + "\n          " + ( true ? "<script src=\"" + assets.client.js + "\" defer></script>" : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>") + "\n    </head>\n    <body>\n        <div id=\"root\">" + markup + "</div>\n        <script>\n          window.__PRELOADED_STATE__ = " + __WEBPACK_IMPORTED_MODULE_4_serialize_javascript___default()(finalState) + "\n        </script>\n    </body>\n</html>");
});

/* harmony default export */ __webpack_exports__["a"] = (server);

/***/ }),

/***/ "./src/server/polyfill.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_fetch__);


global.fetch = __WEBPACK_IMPORTED_MODULE_0_node_fetch___default.a;

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "most":
/***/ (function(module, exports) {

module.exports = require("most");

/***/ }),

/***/ "node-fetch":
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "ramda":
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "recompose":
/***/ (function(module, exports) {

module.exports = require("recompose");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-logger":
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-most":
/***/ (function(module, exports) {

module.exports = require("redux-most");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map