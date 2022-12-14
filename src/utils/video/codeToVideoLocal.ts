import { recordCanvas } from "../canvas/recordCanvas";
import { transcode } from "./transcode";
import { prepareCanvas } from "../canvas/prepareCanvas";
import MimicTypos from "../../enums/MimicTypos";
import { ArrayOfTwoOrMore } from "../../types/ArrayOfTwoOrMore";

export const codeToVideoLocal = async (
  width: number,
  height: number,
  fileLabel: string,
  code: string,
  gradientColors: ArrayOfTwoOrMore<string>,
  mimicTypos: MimicTypos,
  setVideoUrl: (videoUrl: string) => void
) => {
  const canvas = document.getElementById("code-canvas") as HTMLCanvasElement;
  await prepareCanvas(canvas, width, height, gradientColors)
  console.log("canvas is: ", canvas);
  const blob = await recordCanvas(canvas, code, mimicTypos);
  await transcode(
    new Uint8Array(await blob.arrayBuffer()),
    width,
    height,
    setVideoUrl
  );
};
