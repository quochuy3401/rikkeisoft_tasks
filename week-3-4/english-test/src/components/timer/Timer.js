import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";

export const Timer = (props) => {
  const { initialMinutes = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() =>{
      let myInterval = setInterval(() =>{
          if(seconds >0){
              setSeconds(seconds-1);
          }
          if(seconds === 0){
              if(minutes === 0){
                  clearInterval(myInterval);
              } else {
                setMinutes(minutes-1);
                setSeconds(59);
              }
          }
      }, 1000)
      return ()=>{
          clearInterval(myInterval);
      }
  })
  return (
    <div className="test-timer d-flex justify-content-center align-items-center" style={{fontWeight: "bold", fontSize: "30px"}}>
      <FontAwesomeIcon icon={faClock}  />
      <div style={{marginLeft: "10px"}}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
    </div>
  );
};
