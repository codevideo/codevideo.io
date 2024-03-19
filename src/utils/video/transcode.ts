import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const transcode = async (
  recording: Uint8Array,
  width: number,
  height: number,
  setVideoUrl: (videoUrl: string) => void
) => {
  const ffmpeg = new FFmpeg();
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  }
  const name = "record.webm";
  console.log("start transcoding");
  ffmpeg.writeFile(name, recording);
  await ffmpeg.exec([
    "-i",
    name,
    "-c:v",
    "libx264",
    "-s",
    `${width}x${height}`,
    "output.mp4"
  ]);
  console.log("Complete transcoding");
  const data = await ffmpeg.readFile("output.mp4");
  setVideoUrl(
    URL.createObjectURL(new Blob([data], { type: "video/mp4" }))
  );
};
