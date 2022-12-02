// @ts-nocheck
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
});

export const transcode = async (
  webcamData: Uint8Array,
  messageElement: HTMLDivElement,
  videoElement: HTMLVideoElement,
  downloadAnchorElement: HTMLAnchorElement
) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  const name = "record.webm";
  console.log("start transcoding")
  messageElement.innerHTML = "Start transcoding";
  // doesn't exist anymore, API has changed
  // await ffmpeg.write(name, webcamData);
  ffmpeg.FS("writeFile", name, webcamData);
  // also doesn't exist anymore
  // await ffmpeg.transcode(name, "output.mp4");
  await ffmpeg.run("-i", name, "-c:v", "libx264", "output.mp4");
  console.log("Complete transcoding")
  messageElement.innerHTML = "Complete transcoding";
  // also wrong!!!!
  // const data = ffmpeg.read("output.mp4");
  const data = ffmpeg.FS("readFile", "output.mp4");

  videoElement.src = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" })
  );
  downloadAnchorElement.href = videoElement.src;
  downloadAnchorElement.innerHTML = "download mp4";
};
