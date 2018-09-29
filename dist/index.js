"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Countdown = exports.secondsToTimeleft = exports.secondsBetweenTwoDates = exports.formatTimes = void 0;

var _react = require("react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var formatTimes = function formatTimes(timeLeft) {
  return Object.assign.apply(Object, _toConsumableArray(Object.entries(timeLeft).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return _defineProperty({}, key, value.toFixed(0).padStart(2, "0"));
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

var Countdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Countdown, _Component);

  function Countdown(props) {
    var _this;

    _classCallCheck(this, Countdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Countdown).call(this, props));
    _this.state = _this.getTimeLeftAndStoppedState();
    return _this;
  }

  _createClass(Countdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Countdown.intervalId = setInterval(function () {
        _this2.setState(_objectSpread({}, _this2.getTimeLeftAndStoppedState()));
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(Countdown.intervalId);
    }
  }, {
    key: "getTimeLeftAndStoppedState",
    value: function getTimeLeftAndStoppedState() {
      var seconds = secondsBetweenTwoDates(this.props.date, new Date());
      if (seconds <= 0) return {
        hasStopped: true,
        timeLeft: {
          hours: '00',
          minutes: '00',
          seconds: '00'
        }
      };
      return {
        hasStopped: false,
        timeLeft: formatTimes(secondsToTimeleft(seconds))
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children(_objectSpread({}, this.state));
    }
  }]);

  return Countdown;
}(_react.Component);

exports.Countdown = Countdown;