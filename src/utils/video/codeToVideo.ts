import { recordCanvas } from "../canvas/recordCanvas";
import { transcode } from "./transcode";
import { prepareCanvas } from "../canvas/prepareCanvas";
import MimicTypos from "../../enums/MimicTypos";
import { ArrayOfTwoOrMore } from "../../types/ArrayOfTwoOrMore";
import Engine from "../../enums/Engine";

export const codeToVideo = async (
  width: number,
  height: number,
  filename: string,
  code: string,
  gradientColors: ArrayOfTwoOrMore<string>,
  mimicTypos: MimicTypos,
  setVideoUrl: (videoUrl: string) => void,
  engine: Engine
) => {
  const canvas = document.getElementById("code-canvas") as HTMLCanvasElement;
  await prepareCanvas(canvas, width, height, gradientColors);
  console.log("canvas is: ", canvas);
  const blob = await recordCanvas(canvas, code, mimicTypos);
  if (engine === Engine.FRONTEND) {
    console.log('transcoding locally')
    await transcode(
      new Uint8Array(await blob.arrayBuffer()),
      width,
      height,
      setVideoUrl
    );
    return;
  }
  const fd = new FormData();
  fd.append("filename", filename);
  fd.append("size", `${width}x${height}`);
  fd.append("binary_data", blob);
  try {
    console.log("GATSBY_API_URL", process.env.GATSBY_API_URL)
    const response = await fetch(
      process.env.GATSBY_API_URL ||
        "https://api.codevideo.io",
      {
        method: "POST",
        body: fd,
      }
    );
    const json = await response.json();
    setVideoUrl(json.videoUrl);
  } catch (e) {
    console.log("error: ", e);
    // toast("Error uploading video. Please try again.");
    setVideoUrl("");
  }
};
