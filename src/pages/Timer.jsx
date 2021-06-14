import React, { useState, useRef } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const handleChange = () => {
    setTimer(timerRef.current.value);
  };

  const showNotification = async () => {};

  const startTimer = async () => {
    var internalTimer = timer;
    setTimeLeft(internalTimer);

    let countdownInterval = setInterval(() => {
      internalTimer = internalTimer - 1;
      setTimeLeft(internalTimer);

      if (internalTimer <= 0) {
        clearInterval(countdownInterval);
        showNotification();
      }
    }, 1000);
  };

  return (
    <div className="Timer">
      <div className="name">Timer</div>
      {timeLeft === 0 ? (
        <div className="center">
          <input
            type="number"
            min="0"
            max="999"
            step="1"
            ref={timerRef}
            onChange={handleChange}
          />
          <button onClick={startTimer}>Start</button>
        </div>
      ) : (
        <div className="timeLeft">{timeLeft}s</div>
      )}
    </div>
  );
};

export default Timer;
