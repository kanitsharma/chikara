exports.id = 0;
exports.modules = {

/***/ "./src/common/components/Counter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _jsxFileName = '/home/rajatsharma/chikara/packages/mangaflux-web/src/common/components/Counter.js';



var Counter = function Counter(_ref) {
  var increment = _ref.increment,
      incrementIfOdd = _ref.incrementIfOdd,
      incrementAsync = _ref.incrementAsync,
      decrement = _ref.decrement,
      counter = _ref.counter;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      'Here\'s a clicker for you'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      },
      'Clicked: ',
      counter,
      ' times',
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: increment, __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        },
        '+'
      ),
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: decrement, __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          }
        },
        '-'
      ),
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: incrementIfOdd, __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        'Increment if odd'
      ),
      ' ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: function onClick() {
            return incrementAsync();
          }, __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          }
        },
        'Increment async'
      )
    )
  );
};

Counter.propTypes = {
  increment: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  incrementIfOdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  incrementAsync: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  decrement: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  counter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Counter);

/***/ })

};
//# sourceMappingURL=0.ded68c286e8f2c0bb3b0.hot-update.js.map