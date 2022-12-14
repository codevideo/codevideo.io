import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
});

export const transcode = async (
  recording: Uint8Array,
  width: number,
  height: number,
  setVideoUrl: (videoUrl: string) => void
) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  const name = "record.webm";
  console.log("start transcoding");
  ffmpeg.FS("writeFile", name, recording);
  await ffmpeg.run(
    "-i",
    name,
    "-c:v",
    "libx264",
    "-s",
    `${width}x${height}`,
    "output.mp4"
  );
  console.log("Complete transcoding");
  const data = ffmpeg.FS("readFile", "output.mp4");
  setVideoUrl(
    URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
  );
  // videoElement.src = URL.createObjectURL(
  //   new Blob([data.buffer], { type: "video/mp4" })
  // );
  // downloadAnchorElement.href = videoElement.src;
  // downloadAnchorElement.innerHTML = "download mp4";
};
