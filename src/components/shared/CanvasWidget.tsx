import * as React from "react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { animateText } from "../../utils/canvas/animateText";
import { transcode } from "../../utils/video/transcode";

export function CanvasWidget() {
  const { editorSetting } = useAppSelector((state) => state.editor);
  const { code } = editorSetting;
  const [isTranscoded, setIsTranscoded] = useState(false);
  // on mount, run recorder script
  // TODO: on code change, run recorder script
  useEffect(() => {
    fn().then(async ({ blob }) => {
      const videoElement = document.getElementById(
        "output-video"
      ) as HTMLVideoElement;
      const downloadAnchorElement = document.getElementById(
        "dl"
      ) as HTMLAnchorElement;
      const messageElement = document.getElementById(
        "message"
      ) as HTMLDivElement;
      await transcode(
        new Uint8Array(await blob.arrayBuffer()),
        messageElement,
        videoElement,
        downloadAnchorElement
      );
      setIsTranscoded(true);
    });
  }, []);

  const fn = (): Promise<any> => {
    var recordedChunks: Array<Blob> = [];
    var time = 0;

    return new Promise(function (res, rej) {
      var canvas = document.getElementById("code-canvas") as HTMLCanvasElement;

      if (canvas) {
        canvas.width = 500;
        canvas.height = 500;
        var stream = canvas.captureStream(60);

        var mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp9",
        });

        mediaRecorder.start(time);

        mediaRecorder.ondataavailable = function (e) {
          console.log('pushing!!!')
          recordedChunks.push(e.data);
          // old code:
          //   recordedChunks.push(event.data);
          // for demo, removed stop() call to capture more than one frame
        };

        mediaRecorder.onstop = function (event) {
          var blob = new Blob(recordedChunks, {
            type: "video/webm",
          });
          var url = URL.createObjectURL(blob);
          res({ url, blob }); // resolve both blob and url in an object

          // apparently this is needed for video to work, no idea why
          var myVideo = document.getElementById("myVideo") as HTMLVideoElement;
          if (myVideo) {
            myVideo.src = url;
          }
          // removed data url conversion for brevity
        };

        // let canvas = document.querySelector("canvas");
        animateText(canvas, code);

        // super hack, should promisfy based on code and interval time (which should be configurable)
        // for now, this will be fine:
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);

        // for demo, draw random lines and then stop recording
        // simple boy for tests
        // var i = 0,
        //   tid = setInterval(() => {
        //     if (i++ > 60) {
        //       // draw 20 lines
        //       clearInterval(tid);
        //       mediaRecorder.stop();
        //     }
        //     let canvas = document.querySelector("canvas");
        //     let cx = canvas?.getContext("2d");
        //     if (cx) {
        //       cx.beginPath();
        //       cx.strokeStyle = "red";
        //       cx.moveTo(0, 0);
        //       cx.lineTo(100, 100);
        //       cx.stroke();
        //       cx.closePath();
        //       cx.beginPath();
        //       cx.strokeStyle = "blue";
        //       cx.moveTo(0, 100);
        //       cx.lineTo(100, 0);
        //       cx.stroke();
        //       cx.closePath();
        //     }
        //   }, 200);
      }
      return [];
    });
  };

  return (
    <div
      // @ts-ignore
      className={`d-flex flex-column justify-content-center m-3`}
    >
      <h3 className="text-primary">
        <u>Video</u>
      </h3>
      <div className="d-block">
        {!isTranscoded && (
          <canvas
            id="code-canvas"
            style={{ height: "500px", width: "500px", backgroundColor: "gray" }}
          ></canvas>
        )}
        <video style={{ display: "none" }} id="myVideo" controls={true}></video>
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
  );
}
