import { useState } from "react";

function AlamForm({ onSetAlarm }) {
  const [time, setTime] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();
    onSetAlarm(time);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        onChange={(ev) => {
          setTime(ev.target.value);
        }}
      />
      <button type="submit">
        {" "}
        Imposta tra quanti secondi vuoi un allarme{" "}
      </button>
    </form>
  );
}

export default AlamForm;
