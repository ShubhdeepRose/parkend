import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [elapsedTime, setElapsedTime] = useState(0);

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
        window.removeEventListener('resize', detectSize);
    }
  }, [windowDimension]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {elapsedTime < 10 && <ReactConfetti width={windowDimension.width} height={windowDimension.height} />}
    </>
  );
};

export default Confetti;