import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { recordCanvas } from "../../utils/canvas/recordCanvas";
import { transcode } from "../../utils/video/transcode";
import { codeToVideo } from "../../utils/video/codeToVideo";

export function CanvasWidget() {
  const { editorSetting } = useAppSelector((state) => state.editor);
  const { fileLabel, code } = editorSetting;
  const [isTranscoded, setIsTranscoded] = useState(false);
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  const convertCodeToVideo = async () => {

    if (isLocal) {
      convertToVideoLocal();
      return;
    } 
    
    codeToVideo(fileLabel, code);
  };

  const convertToVideoLocal = async () => {
    setIsTranscoded(false);
    setIsTranscoding(true);
    const canvas = document.getElementById("code-canvas") as HTMLCanvasElement;
    console.log("canvas is: ", canvas);
    const blob = await recordCanvas(canvas, code);
    const videoElement = document.getElementById(
      "output-video"
    ) as HTMLVideoElement;
    const downloadAnchorElement = document.getElementById(
      "dl"
    ) as HTMLAnchorElement;
    const messageElement = document.getElementById("message") as HTMLDivElement;
    await transcode(
      new Uint8Array(await blob.arrayBuffer()),
      messageElement,
      videoElement,
      downloadAnchorElement
    );
    setIsTranscoded(true);
    setIsTranscoding(false);
  }

  const convertButtonText = isTranscoding ? "Converting..." : "Convert!";

  return (
    <>
      <div
        // @ts-ignore
        className={`d-flex flex-row justify-content-center align-items-center m-3`}
      >
        {"\u279C"}
        <button
          className="btn btn-primary align-self-center"
          disabled={isTranscoding}
          onClick={convertCodeToVideo}
        >
          {convertButtonText}
        </button>
        {"\u279C"}
      </div>
      <div
        // @ts-ignore
        className={`d-flex flex-column justify-content-center m-3`}
      >
        <h3 className="text-primary">
          <u>Video</u>
        </h3>
        <div className="d-block">
          <canvas
            width={1000}
            height={1000}
            id="code-canvas"
            style={{
              display: isTranscoded ? "none" : "block",
              backgroundColor: '#272822',
              transform: 'scale(0.5)'
            }}
          ></canvas>
          <video
            style={{ display: "none" }}
            id="myVideo"
            controls={true}
          ></video>
          <video
            style={{ display: isTranscoded ? "block" : "none" }}
            id="output-video"
            controls={true}
          ></video>
          <a
            style={{ display: isTranscoded ? "block" : "none" }}
            id="dl"
            href=""
            download="download.mp4"
          >
            Download
          </a>
        </div>
        <div id="message"></div>
      </div>
    </>
  );
}
