"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secondsToTimeleft = exports.secondsBetweenTwoDates = exports.formatTimes = exports.Countdown = void 0;

var _react = require("react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Countdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Countdown, _Component);

  function Countdown() {
    _classCallCheck(this, Countdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Countdown).apply(this, arguments));
  }

  _createClass(Countdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.intervalId = setInterval(function () {
        var seconds = secondsBetweenTwoDates(_this.props.date, new Date());
        if (seconds <= 0) _this.setState({
          hasStopped: true
        });
        var timeLeft = formatTimes(secondsToTimeleft(seconds));

        _this.setState({
          timeLeft: timeLeft
        });
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state) return null;
      return this.props.children(this.state);
    }
  }]);

  return Countdown;
}(_react.Component);

exports.Countdown = Countdown;

var formatTimes = function formatTimes(timeLeft) {
  return Object.assign.apply(Object, _toConsumableArray(Object.entries(timeLeft).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return _defineProperty({}, k, v.toFixed(0).padStart(2, "0"));
  })));
};

exports.formatTimes = formatTimes;

var secondsBetweenTwoDates = function secondsBetweenTwoDates(a, b) {
  return (Date.parse(a) - Date.parse(b)) / 1000;
};

exports.secondsBetweenTwoDates = secondsBetweenTwoDates;

var secondsToTimeleft = function secondsToTimeleft(seconds) {
  var timeLeft = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (seconds >= 3600) {
    timeLeft.hours = Math.floor(seconds / 3600);
    seconds -= timeLeft.hours * 3600;
  }

  if (seconds >= 60) {
    timeLeft.minutes = Math.floor(seconds / 60);
    seconds -= timeLeft.minutes * 60;
  }

  timeLeft.seconds = seconds;
  return timeLeft;
};

exports.secondsToTimeleft = secondsToTimeleft;