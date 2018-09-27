import { Component } from "react";

export const formatTimes = timeLeft =>
  Object.assign(
    ...Object.entries(timeLeft).map(([key, value]) => ({
      [key]: value.toFixed(0).padStart(2, "0")
    }))
  );

export const secondsBetweenTwoDates = (a, b) =>
  (Date.parse(a) - Date.parse(b)) / 1000;

export const secondsToTimeleft = seconds => {
  const timeLeft = {
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

export class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = this.getTimeLeftAndStoppedState();
  }
  componentDidMount() {
    Countdown.intervalId = setInterval(() => {
      this.setState({ ...this.getTimeLeftAndStoppedState() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(Countdown.intervalId);
  }
  getTimeLeftAndStoppedState() {
    const seconds = secondsBetweenTwoDates(this.props.date, new Date());
    if (seconds <= 0) return { hasStopped: true, timeLeft: { hours: '00', minutes: '00', seconds: '00' } };
    return { hasStopped: false, timeLeft: formatTimes(secondsToTimeleft(seconds)) };
  }
  render() {
    return this.props.children({ ...this.state });
  }
}


