import { Component } from "react";

export class Countdown extends Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {
      let seconds = secondsBetweenTwoDates(this.props.date, new Date());
      if (seconds <= 0) this.setState({ hasStopped: true });
      let timeLeft = formatTimes(secondsToTimeleft(seconds));
      this.setState({ timeLeft });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    if (!this.state.timeLeft) return null;
    return this.props.children(this.state);
  }
}

export const formatTimes = timeLeft =>
  Object.assign(
    ...Object.entries(timeLeft).map(([k, v]) => ({
      [k]: v.toFixed(0).padStart(2, "0")
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
