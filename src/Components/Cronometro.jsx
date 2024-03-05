import { useEffect, useState } from "react";
import "./Cronometro.css";
import AlamForm from "./AlarmForm";
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
  const [alarmTime, setAlarmTime] = useState(null);
  const [showAlarm, setShowAlarm] = useState(false);

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

  useEffect(() => {
    console.log("Time è cambiato", time, alarmTime);
    // Imposto showAlarm a true se il tempo è maggiore di alarmTime
    // e showAlarm non è già stato impostato
    if (time > alarmTime * 1000 && showAlarm === false) {
      // setIsRunning(false);
      setShowAlarm(true);
      console.warn("Allarme scattato");
    }
  }, [time]);

  function startStop() {
    setIsRunning(!isRunning);
  }

  function reset() {
    setIsRunning(false);
    setTime(0);
    setShowAlarm(false);
  }

  const milliseconds = ("00" + (time % 1000)).slice(-2);
  const seconds = ("00" + (Math.floor(time / 1000) % 60)).slice(-2);
  const minutes = ("00" + Math.floor(time / 1000 / 60)).slice(-2);

  return (
    <div className={`cronometro ${showAlarm ? " alarm" : ""}`}>
      <h1>Cronometro {showAlarm ? "SVEGLIAAAAAA!!!11!!1" : ""}</h1>

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
      <AlamForm onSetAlarm={(time) => setAlarmTime(time)} />
    </div>
  );
}

export default Cronometro;
