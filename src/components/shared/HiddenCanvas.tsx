import * as React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

export function HiddenCanvas() {
  // use whatever is in redux state as dimensions
  const { width, height } = useAppSelector((state) => state.video);
  
  return (
    <canvas
      width={width}
      height={height}
      id="code-canvas"
      style={{
        display: "none",
        backgroundColor: "#272822",
        transform: "scale(0.5)",
      }}
    />
  );
}
