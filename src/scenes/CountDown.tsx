import { useEffect, useState } from "react";
import "../css/CountDown.css";

type props = {
  onStart: () => void;
};

function CountDown({ onStart }: props) {
  const [countdown, setCountDown] = useState<number>(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setTimeout(() => {
            onStart();
          }, 0);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onStart]);

  return (
    <div className="count-down">
      ゲーム開始まで
      <br />
      <span className="count-number">{countdown}</span>秒
    </div>
  );
}

export default CountDown;
