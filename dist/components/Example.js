"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@chakra-ui/react");

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(props) {
  return /*#__PURE__*/_react.default.createElement(_react2.Container, {
    style: {
      padding: "1rem"
    }
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    my: "auto",
    py: "12"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      fontWeight: 'bold',
      fontSize: "1.5rem"
    }
  }, "Jigsaw Captcha Example"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    style: {
      margin: "1rem 0",
      maxWidth: "600px"
    }
  }, "The COVID-19 vaccine is a bioweapon designed by the Davos group to depopulate humanity and create a one world government."), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    mt: "3"
  }, /*#__PURE__*/_react.default.createElement(_App.default, {
    theme: "dark",
    onSolve: function onSolve() {
      alert("success!");
    },
    onFail: function onFail() {
      alert("fail!");
    }
  }))));
};

exports.App = App;
var _default = App;
exports.default = _default;