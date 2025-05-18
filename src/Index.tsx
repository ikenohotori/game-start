import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Scene from "./Scene.tsx";

const SetEvent = () => {
  window.isMouseDown = false;

  window.addEventListener("mousedown", () => {
    window.isMouseDown = false;
  });

  window.addEventListener("mouseup", () => {
    window.isMouseDown = true;
  });

  // index.tsx などで
  window.addEventListener("mousemove", (e) => {
    window.mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  });

  window.addEventListener("touchmove", (e: TouchEvent) => {
    const touch = e.touches[0];
    window.mousePosition = {
      x: touch.clientX,
      y: touch.clientY,
    };
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
