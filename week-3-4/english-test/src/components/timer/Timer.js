import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect } from "react";

export const Timer = (props) => {
  const { timerParams, deadline } = props;
  const { minutes, setMinutes, seconds, setSeconds } = timerParams;

  // update timer every one second
  useEffect(() => {
    let myInterval = setInterval(() => {
      let now = new Date().getTime();
      let timeRemain = deadline.getTime() - now;
      if (timeRemain > 0) {
        setMinutes(Math.floor((timeRemain % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((timeRemain % (1000 * 60)) / 1000));
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div
      className="test-timer d-flex justify-content-center align-items-center"
      style={{ fontWeight: "bold", fontSize: "30px" }}
    >
      <FontAwesomeIcon icon={faClock} />
      <div style={{ marginLeft: "10px" }}>
        {" "}
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};
