import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Scene from "./Scene.tsx";

const SetEvent = () => {
  const root = document.getElementById("root");
  if (!root) return;

  root.addEventListener(
    "touchstart",
    (e: TouchEvent) => {
      // UI要素（button等）なら何もしない
      if (
        (e.target as HTMLElement).closest("button, a, input, textarea, select")
      )
        return;
      window.isMouseDown = true;
      const touch = e.touches[0];
      window.mousePosition = {
        x: touch.clientX,
        y: touch.clientY,
      };
      e.preventDefault();
    },
    { passive: false }
  );

  root.addEventListener(
    "touchmove",
    (e: TouchEvent) => {
      if (!window.isMouseDown) return;
      if (
        (e.target as HTMLElement).closest("button, a, input, textarea, select")
      )
        return;
      const touch = e.touches[0];
      window.mousePosition = {
        x: touch.clientX,
        y: touch.clientY,
      };
      e.preventDefault();
    },
    { passive: false }
  );

  root.addEventListener("touchend", () => {
    window.isMouseDown = false;
  });
};

const StartApplication = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Scene />
    </StrictMode>
  );
};

SetEvent();
StartApplication();
