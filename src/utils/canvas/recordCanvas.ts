import { animateText, animateTextNew } from "./animateText";

export const recordCanvas = async (
  canvas: HTMLCanvasElement,
  code: string
): Promise<Blob> => {
  var recordedChunks: Array<Blob> = [];
  var time = 0;

  var stream = canvas.captureStream(60);

  var mediaRecorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp9",
  });

  mediaRecorder.start(time);

  mediaRecorder.ondataavailable = function (e) {
    recordedChunks.push(e.data);
  };

  // let canvas = document.querySelector("canvas");
  // animateText(canvas, code);
  await animateTextNew(canvas, code);
  mediaRecorder.stop();

  var blob = new Blob(recordedChunks, {
    type: "video/webm",
  });
  //   var url = URL.createObjectURL(blob);
  return blob; // resolve both blob and url in an object
};
