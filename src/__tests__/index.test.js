import {
  secondsBetweenTwoDates,
  secondsToTimeleft,
  formatTimes
} from "../index";

test("should give one minute five seconds", () => {
  expect(secondsToTimeleft(65)).toEqual({
    hours: 0,
    minutes: 1,
    seconds: 5
  });
});
test("should give 65 seconds", () => {
  expect(
    secondsBetweenTwoDates(
      "2018-09-25T21:09:05.000Z",
      "2018-09-25T21:08:00.000Z"
    )
  ).toEqual(65);
});
test("should give one minute five seconds", () => {
  expect(
    formatTimes({
      hours: 0,
      minutes: 1,
      seconds: 5
    })
  ).toEqual({
    hours: "00",
    minutes: "01",
    seconds: "05"
  });
});
