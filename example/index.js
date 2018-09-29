import React, { Component } from "react";
import { Countdown } from "@jackkav/react-countdown";
let thirtyMins = new Date();
thirtyMins = new Date(thirtyMins.setMinutes(thirtyMins.getMinutes() + 30));

class App extends Component {
  render() {
    return (
        <Countdown date={thirtyMins}>
          {({ timeLeft, hasStopped }) => (
            <div>
              {hasStopped ? (
                <p>Times up!</p>
              ) : (
                <p>
                  {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                </p>
              )}
            </div>
          )}
        </Countdown>
    );
  }
}

export default App;
