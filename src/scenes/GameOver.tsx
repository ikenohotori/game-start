import { useEffect, useState } from "react";
import "../css/GameOver.css";

type props = {
  passTime: number;
  onRetry: () => void;
};

function GameOver({ passTime, onRetry }: props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [bestTime, setBestTime] = useState(0);

  useEffect(() => {
    setCurrentTime(Math.round(passTime));

    if (window.localStorage) {
      const key = "neko-game-key";
      const item = localStorage.getItem(key);
      let best = 0;
      let updated = false;
      if (item === null) {
        // 初回は記録なしなのでbestTimeは0
        localStorage.setItem(key, JSON.stringify(currentTime));
        best = 0;
        updated = true;
      } else {
        const parsed = Number(JSON.parse(item));
        best = isNaN(parsed) ? 0 : parsed;
        if (best < currentTime) {
          updated = true;
          localStorage.setItem(key, JSON.stringify(currentTime));
        }
      }
      setBestTime(best);
      setUpdateFlag(updated);
    }
  }, [currentTime]);

  return (
    <div className="gameover-root">
      <h2 className="gameover-title">ゲームオーバー！！</h2>
      <div className="gameover-records">
        <div className="gameover-current">
          <span className="label">今回の記録</span>
          <span className="value">{currentTime} 秒</span>
        </div>
        <div className="gameover-best">
          <span className="label">これまでの最高記録</span>
          <span className="value">{bestTime} 秒</span>
        </div>
        {updateFlag && (
          <div className="gameover-update">最高記録 更新おめでとう！！</div>
        )}
      </div>
      <div className="gameover-btn-wrapper">
        <button className="gameover-retry-btn" onClick={onRetry}>
          もう一回やる
        </button>
      </div>
    </div>
  );
}

export default GameOver;
