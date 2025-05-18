import React, { useEffect, useState } from "react";
import {
  State,
  initialState,
  judgeState,
  updateGameState,
} from "../states/State";
import "../css/Game.css";

type props = {
  onGameOver: (passTime: number) => void;
};

function Game({ onGameOver }: props) {
  const [gameState, setGameState] = useState<State>(initialState);

  useEffect(() => {
    const parentDiv = document.getElementById("game-parent");
    if (parentDiv) {
      const rect = parentDiv.getBoundingClientRect();
      setGameState((prev) => ({
        ...prev,
        parentRect: rect,
      }));
    }

    const interval = setInterval(() => {
      setGameState((current) =>
        updateGameState(current, (score) => {
          if (judgeState(score)) {
            const passTime = score.enemyAddTimer / 60;
            onGameOver(passTime);
          }
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="game-parent" className="game-root">
      <div
        className="player"
        style={{
          left: `${gameState.player.left}%`,
          top: `${gameState.player.top}%`,
        }}
      >
        <img src="./images/hum.png" alt="player" className="player-img" />
      </div>

      {gameState.enemies.map((enemy, index) => (
        <div
          key={index}
          className="enemy"
          style={{
            left: `${enemy.left}%`,
            top: `${enemy.top}%`,
          }}
        >
          <img src="./images/neko.png" alt="enemy" className="enemy-img" />
        </div>
      ))}
    </div>
  );
}

export default Game;
