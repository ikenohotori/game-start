import { useState } from "react";
import Menu from "./scenes/Menu";
import CountDown from "./scenes/CountDown";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import "./css/Scene.css";
import Bonus from "./scenes/Bonus";

enum SceneType {
  Menu,
  CountDown,
  Game,
  GameOver,
  Bonus,
}

function Scene() {
  const [scene, setScene] = useState<SceneType>(SceneType.Menu);
  const [passTime, setPassTime] = useState<number>(0);

  return (
    <div className="box">
      <div className="container">
        {scene === SceneType.Menu && (
          <Menu onStart={() => setScene(SceneType.CountDown)} />
        )}
        {scene === SceneType.CountDown && (
          <CountDown onStart={() => setScene(SceneType.Game)} />
        )}
        {scene === SceneType.Game && (
          <Game
            onGameOver={(passTime) => {
              if (passTime >= 60) {
                setScene(SceneType.Bonus);
              } else {
                setScene(SceneType.GameOver);
                setPassTime(passTime);
              }
            }}
          />
        )}
        {scene === SceneType.GameOver && (
          <GameOver
            passTime={passTime}
            onRetry={() => setScene(SceneType.CountDown)}
          />
        )}
        {scene === SceneType.Bonus && (
          <Bonus onRetry={() => setScene(SceneType.CountDown)} />
        )}
      </div>
    </div>
  );
}

export default Scene;
