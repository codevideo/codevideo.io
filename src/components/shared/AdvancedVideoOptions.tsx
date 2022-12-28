import * as React from "react";
import MimicTypos from "../../enums/MimicTypos";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  setDimensions,
  setEngine,
  setGradientColors,
  setMimicTypos,
} from "../../store/videoSlice";
import Engine from "../../enums/Engine";

export interface IAdvancedVideoOptionsProps {}

export function AdvancedVideoOptions(props: IAdvancedVideoOptionsProps) {
  const { height, width, gradientColors, mimicTypos, engine } = useAppSelector(
    (state) => state.video
  );
  const dispatch = useAppDispatch();
  return (
    <>
      <label>Engine:</label>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            onClick={() => dispatch(setEngine(Engine.BACKEND))}
            className="btn btn-dark text-light m-3"
            style={{
              borderColor: "#22FDB2",
              borderStyle: "solid",
              borderWidth: engine === Engine.BACKEND ? 5 : 0,
            }}
          >
            Backend
          </button>
          <small>(Recommended)</small>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            onClick={() => dispatch(setEngine(Engine.FRONTEND))}
            className="btn btn-dark text-light m-3"
            style={{
              borderColor: "#22FDB2",
              borderStyle: "solid",
              borderWidth: engine === Engine.FRONTEND ? 5 : 0,
            }}
          >
            Frontend
          </button>
          <small>(Works only on Desktop Machines)</small>
        </div>
      </div>
      <label>Background gradient:</label>
      <div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div
            onClick={() => dispatch(setGradientColors(["#91ffd9", "#f5ff97"]))}
            className="m-3 rounded"
            style={{
              display: "inline-block",
              background: "linear-gradient(315deg, #91ffd9 0%, #f5ff97 100%)",
              width: 40,
              height: 40,
              cursor: "pointer",
              borderColor: "#22FDB2",
              borderStyle: "solid",
              borderWidth:
                gradientColors[0] === "#91ffd9" &&
                gradientColors[1] === "#f5ff97"
                  ? 5
                  : 0,
            }}
          />
          <div
            onClick={() => dispatch(setGradientColors(["#9900ff", "#ff9500"]))}
            className="m-3 rounded"
            style={{
              display: "inline-block",
              background: "linear-gradient(315deg, #9900ff 0%, #ff9500 100%)",
              width: 40,
              height: 40,
              cursor: "pointer",
              borderColor: "#22FDB2",
              borderStyle: "solid",

              borderWidth:
                gradientColors[0] === "#9900ff" &&
                gradientColors[1] === "#ff9500"
                  ? 5
                  : 0,
            }}
          />
          <div
            onClick={() => dispatch(setGradientColors(["#00ffa6", "#00acff"]))}
            className="m-3 rounded"
            style={{
              display: "inline-block",
              background: "linear-gradient(315deg, #00ffa6 0%, #00acff 100%)",
              width: 40,
              height: 40,
              cursor: "pointer",
              borderColor: "#22FDB2",
              borderStyle: "solid",
              borderWidth:
                gradientColors[0] === "#00ffa6" &&
                gradientColors[1] === "#00acff"
                  ? 5
                  : 0,
            }}
          />
          <div
            onClick={() => dispatch(setGradientColors(["#000000", "#ffffff"]))}
            className="m-3 rounded"
            style={{
              display: "inline-block",
              background: "linear-gradient(315deg, #000000 0%, #ffffff 100%)",
              width: 40,
              height: 40,
              cursor: "pointer",
              borderColor: "#22FDB2",
              borderStyle: "solid",
              borderWidth:
                gradientColors[0] === "#000000" &&
                gradientColors[1] === "#ffffff"
                  ? 5
                  : 0,
            }}
          />
        </div>
      </div>
      <label>Video Size:</label>
      <br />
      <span className="text-muted">Landscape</span>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          onClick={() => dispatch(setDimensions({ width: 1920, height: 1080 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 1920 && height === 1080 ? 5 : 0,
          }}
        >
          1920x1080
        </button>
        <button
          onClick={() => dispatch(setDimensions({ width: 1280, height: 720 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 1280 && height === 720 ? 5 : 0,
          }}
        >
          1280x720
        </button>
        <button
          onClick={() => dispatch(setDimensions({ width: 960, height: 540 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 960 && height === 540 ? 5 : 0,
          }}
        >
          960x540
        </button>
      </div>
      <span className="text-muted">Portrait</span>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          onClick={() => dispatch(setDimensions({ width: 1080, height: 1920 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 1080 && height === 1920 ? 5 : 0,
          }}
        >
          1080x1920
        </button>
        <button
          onClick={() => dispatch(setDimensions({ width: 720, height: 1280 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 720 && height === 1280 ? 5 : 0,
          }}
        >
          720x1280
        </button>
        <button
          onClick={() => dispatch(setDimensions({ width: 540, height: 960 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 540 && height === 960 ? 5 : 0,
          }}
        >
          540x960
        </button>
      </div>
      <span className="text-muted">Square</span>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          onClick={() => dispatch(setDimensions({ width: 2048, height: 2048 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 2048 && height === 2048 ? 5 : 0,
          }}
        >
          2048x2048
        </button>
        <button
          onClick={() => dispatch(setDimensions({ width: 1080, height: 1080 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 1080 && height === 1080 ? 5 : 0,
          }}
        >
          1080x1080
        </button>
        <button
          onClick={() => dispatch(setDimensions({ width: 960, height: 960 }))}
          className="btn btn-dark text-light m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: width === 960 && height === 960 ? 5 : 0,
          }}
        >
          960x960
        </button>
      </div>
      <label>Mimic Typos:</label>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          onClick={() => dispatch(setMimicTypos(MimicTypos.NEVER))}
          className="btn btn-secondary m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: mimicTypos === MimicTypos.NEVER ? 5 : 0,
          }}
        >
          Never
        </button>
        <button
          onClick={() => dispatch(setMimicTypos(MimicTypos.SOMETIMES))}
          className="btn btn-secondary m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: mimicTypos === MimicTypos.SOMETIMES ? 5 : 0,
          }}
        >
          Sometimes
        </button>
        <button
          onClick={() => dispatch(setMimicTypos(MimicTypos.OFTEN))}
          className="btn btn-secondary m-3"
          style={{
            borderColor: "#22FDB2",
            borderStyle: "solid",
            borderWidth: mimicTypos === MimicTypos.OFTEN ? 5 : 0,
          }}
        >
          Often
        </button>
      </div>
    </>
  );
}
