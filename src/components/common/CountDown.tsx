import React, { useState, useEffect } from "react";

const Countdown = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex space-x-4 text-center text-white">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <span className="text-4xl font-bold">{timeLeft[interval]}</span>
          <span className="uppercase">{interval}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;