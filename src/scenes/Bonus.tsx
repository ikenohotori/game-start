import React, { useEffect, useState } from "react";
import "../css/Bonus.css";

type props = {
  onRetry: () => void;
};

function Bonus({ onRetry }: props) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => prev + 0.2); // 無限に大きく
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bonus-root">
      <div className="bonus-effect">
        <div className="bonus-firework"></div>
        <div className="bonus-firework bonus-firework2"></div>
        <div className="bonus-firework bonus-firework3"></div>
      </div>
      <div className="bonus-dance-area">
        <img
          src="./images/reiko.png"
          alt="麗子ダンス"
          className="reiko-dance"
          style={{ transform: `scale(${scale})` }}
        />
        <img
          src="./images/ryo.png"
          alt="両津ダンス"
          className="ryoutsu-dance"
          style={{ transform: `scale(${scale})` }}
        />
        <img
          src="./images/nakagawa.png"
          alt="中川ダンス"
          className="nakagawa-dance"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
      <div className="bonus-text animate-bonus-text">
        おめでとう！！
        <br />
        両津が踊ってるぞ！！
      </div>
      <div className="bonus-btn-wrapper">
        <button className="bonus-retry-btn" onClick={onRetry}>
          メニューに戻る
        </button>
      </div>
    </div>
  );
}

export default Bonus;
