import MimicTypos from "../../enums/MimicTypos";
import { animateText } from "./animateText";

export const recordCanvas = async (
  canvas: HTMLCanvasElement,
  code: string,
  mimicTypos: MimicTypos
): Promise<Blob> => {
  var recordedChunks: Array<Blob> = [];
  var time = 0;

  // capture stream at 60 fps
  var stream = canvas.captureStream(60);

  var mediaRecorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp9",
  });


  mediaRecorder.ondataavailable = function (e) {
    recordedChunks.push(e.data);
  };

  mediaRecorder.start(0);

  await animateText(canvas, code, mimicTypos);

  mediaRecorder.stop();

  var blob = new Blob(recordedChunks, {
    type: "video/webm",
  });
  //   var url = URL.createObjectURL(blob);
  return blob; // resolve both blob and url in an object
};
