"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@chakra-ui/react");

var _jiggy = _interopRequireDefault(require("../img/jiggy.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var App = function App(props) {
  var onSolve = props.onSolve,
      onFail = props.onFail,
      theme = props.theme,
      initialText = props.initialText,
      disableProvider = props.disableProvider,
      maxW = props.maxW;

  var JigsawTrack = function JigsawTrack() {
    var _useState = (0, _react.useState)(38),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        mouseDown = _useState4[0],
        setMouseDown = _useState4[1];

    var _useState5 = (0, _react.useState)(null),
        _useState6 = _slicedToArray(_useState5, 2),
        targetX = _useState6[0],
        setTargetX = _useState6[1];

    var _useState7 = (0, _react.useState)(0),
        _useState8 = _slicedToArray(_useState7, 2),
        tries = _useState8[0],
        setTries = _useState8[1];

    var _useState9 = (0, _react.useState)(initialText || "Solve the puzzle to prove you're human."),
        _useState10 = _slicedToArray(_useState9, 2),
        text = _useState10[0],
        setText = _useState10[1];

    var maxTries = 5;
    var selectedTheme = theme || "dark";
    (0, _react.useEffect)(function () {
      initialize();
    }, []);

    var initialize = function initialize() {
      var v = 88 + Math.round(Math.random() * 180);
      setValue(38);
      setTargetX(v);
    };

    var checkJiggyFits = function checkJiggyFits() {
      var grace = 10;

      if (value <= targetX + grace && value >= targetX - grace) {
        solve();
      } else {
        fail();
      }
    };

    var fail = function fail() {
      console.log("fail");
      setTries(tries + 1);

      if (maxTries - tries <= 0) {
        lock();
      } else {
        setText("Oops, that didn't work, please try again. (" + (maxTries - tries) + " tries left)");
        initialize();
      }

      if (onFail) {
        onFail();
      }

      ;
    };

    var lock = function lock() {
      var time = 60;
      setInterval(function () {
        time--;

        if (time < 0) {
          return;
        }

        setText("You've failed too many times. You can try again in " + time + "s.");

        if (time === 0) {
          initialize();
          setTries(0);
          setText("Solve the puzzle to prove you're human.");
        }
      }, 1000);
    };

    var solve = function solve() {
      console.log("correct!");
      setText("Great! You've completed the captcha. You can now continue.");
      setValue(targetX);

      if (onSolve) {
        onSolve();
      }

      ;
    };

    var Jiggy = function Jiggy(props) {
      var ml = props.ml;
      return /*#__PURE__*/_react.default.createElement(_react2.Box, {
        ml: ml,
        position: "relative",
        cursor: "pointer",
        zIndex: "99"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        backgroundImage: 'url(' + _jiggy.default + ')',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        boxSize: "1.8rem",
        flexShrink: "0"
      }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        boxSize: "15px",
        marginTop: "-20px",
        marginLeft: "6px",
        position: "absolute",
        boxShadow: "0px 0px 28px 0px rgba(255,204,0,1)"
      }));
    };

    var Target = function Target(props) {
      var x = props.x;
      return /*#__PURE__*/_react.default.createElement(_react2.Box, {
        backgroundImage: 'url(' + _jiggy.default + ')',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        boxSize: "1.8rem",
        flexShrink: "0",
        filter: selectedTheme === "light" ? "grayscale(1) brightness(1.1)" : "grayscale(1) contrast(0.3) brightness(.4)",
        position: "absolute",
        marginLeft: x - 27 + "px"
      });
    };

    var Info = function Info() {
      return /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "sm",
        mt: "1",
        w: "full",
        alignItems: "flexStart"
      }, text);
    };

    var mouseMove = function mouseMove(e) {
      if (mouseDown) {
        var relX = e.target.parentNode.parentNode.getBoundingClientRect().left - 12;
        var mouseX = e.screenX;
        setValue(mouseX - relX);
      }
    };

    var touchMove = function touchMove(e) {
      if (e.touches.length > 0) {
        var relX = e.target.parentNode.parentNode.getBoundingClientRect().left - 12;
        var mouseX = e.touches[0].clientX;
        console.log(mouseX - relX);
        setValue(mouseX - relX);
      }
    };

    var handleTouchEvent = function handleTouchEvent(e) {
      console.log(e.type);

      if (e.type === "touchstart") {
        setMouseDown(true);
      } else if (e.type === "touchend") {
        setMouseDown(false);
        checkJiggyFits();
      } else {}
    };

    var handleMouseEvent = function handleMouseEvent(e) {
      console.log(e.type);

      if (e.type === "mousedown") {
        setMouseDown(true);
      } else if (e.type === "mouseout") {} else {
        setMouseDown(false);
        checkJiggyFits();
      }
    };

    var JiggyRail = function JiggyRail() {
      if (maxTries - tries < 0) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_react2.Box, {
        d: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        rounded: "sm",
        w: "full",
        pointerEvents: "none",
        py: "1"
      }, /*#__PURE__*/_react.default.createElement(Jiggy, {
        ml: "calc(" + value + "px - 1.7rem)"
      }), /*#__PURE__*/_react.default.createElement(Target, {
        x: targetX
      }));
    };

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      cursor: "pointer",
      onMouseMove: mouseMove,
      onTouchMove: touchMove,
      onTouchStart: handleTouchEvent,
      onTouchEnd: handleTouchEvent,
      onTouchLeave: handleTouchEvent,
      onMouseDown: handleMouseEvent,
      onMouseUp: handleMouseEvent,
      bg: selectedTheme === "light" ? "#f9f9f9" : "#171717",
      color: selectedTheme === "light" ? "black" : "rgb(255 255 255 / 92%)",
      w: "full",
      shadow: "xs",
      rounded: "md",
      d: "flex",
      flexDirection: "column",
      userSelect: "none",
      alignItems: "center",
      p: "3"
    }, /*#__PURE__*/_react.default.createElement(JiggyRail, null), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      mt: "2",
      w: "full",
      textAlign: "left"
    }, /*#__PURE__*/_react.default.createElement(Info, null)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      mt: "2",
      textAlign: "right",
      w: "full",
      fontSize: "xs",
      d: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      flexDirection: "row",
      opacity: "0.6"
    }, "Jigsaw captcha \xA9 Made By Goldeneye Industries")));
  };

  if (disableProvider) {
    return /*#__PURE__*/_react.default.createElement(_react2.Container, {
      maxW: maxW || "300px",
      m: "0",
      p: "0"
    }, /*#__PURE__*/_react.default.createElement(JigsawTrack, null));
  }

  return /*#__PURE__*/_react.default.createElement(_react2.ChakraProvider, null, /*#__PURE__*/_react.default.createElement(_react2.Container, {
    maxW: maxW || "300px",
    m: "0",
    p: "0"
  }, /*#__PURE__*/_react.default.createElement(JigsawTrack, null)));
};

exports.App = App;
var _default = App;
exports.default = _default;