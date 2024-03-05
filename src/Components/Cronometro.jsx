import React, { useEffect, useState } from "react";
import "./Cronometro.css";
/**
 *
 * Che sia bello e funzionale
 * start/stop
 * allarme temporizzato (scegliamo noi quando)
 *
 */
function Cronometro() {
  const [isRunning, setIsRunning] = useState(false);
  // ms
  const [time, setTime] = useState(0);

  useEffect(() => {
    //..... Se isRunning è true, avvio il cronometro
    //..... Altrimenti, lo fermo
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 50);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  function startStop() {
    setIsRunning(!isRunning);
  }

  function reset() {
    setIsRunning(false);
    setTime(0);
  }

  const milliseconds = ("00" + (time % 1000)).slice(-2);
  const seconds = ("00" + (Math.floor(time / 1000) % 60)).slice(-2);
  const minutes = ("00" + Math.floor(time / 1000 / 60)).slice(-2);

  return (
    <div>
      <h1>Cronometro</h1>

      <div className={"clock " + (isRunning ? "playing" : "")}>
        <div
          style={{
            transform: `rotate(${(360 * minutes) / 60}deg)`,
          }}
          className="tick minute"
        />
        <div
          className="tick second"
          style={{
            transform: `rotate(${(360 * time) / 1000 / 60}deg)`,
          }}
        />
        <h6>
          {minutes}:{seconds}:{milliseconds}
        </h6>
      </div>
      <button onClick={startStop}>start/stop</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default Cronometro;
