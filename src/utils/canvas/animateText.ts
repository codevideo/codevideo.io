import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import { colorCodeCharacter } from "../tokens/colorCodeCharacter";
import { sleep } from "../sleep";
import MimicTypos from "../../enums/MimicTypos";

interface IStory {
  txt: string;
  storycount: number;
  linecount: number;
  lineheight: number;
  xpos: number;
  ypos: number;
  startY: number;
  speed: number;
  animate: boolean;
  complete: boolean;
  storyarr: Array<string>;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

const runTypoLogic = async (
  mimicTypos: MimicTypos,
  ctx: CanvasRenderingContext2D,
  lastCharacter: string,
  lastX: number,
  lastY: number,
  xOffset: number
): Promise<void> => {
  if (mimicTypos === MimicTypos.NEVER) {
    return;
  }
  let typoProbability = 0;
  if (mimicTypos === MimicTypos.SOMETIMES) {
    typoProbability = 0.025;
  }
  if (mimicTypos === MimicTypos.OFTEN) {
    typoProbability = 0.1;
  }

  // now the actual logic
  if (Math.random() > typoProbability) {
    return;
  }

  // begin typo logic:

  // first save the current color
  const currentColor = ctx.fillStyle;

  // also generate a random for a length of typo to make - from 1 to 3 characters
  const typoLength = Math.floor(Math.random() * 3) + 1;
  // now type horizontally across the screen with a random character following the position
  for (let i = 1; i < typoLength + 1; i++) {
    const randomCharacter = chars[getRandomInt(0,35)]
    ctx.fillText(randomCharacter, lastX + xOffset * i, lastY);
    await sleep(200);
  }
  // now do various fill rects with black to simulate "fixing" the typo
  for (let i = typoLength + 1; i > 0; i--) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(lastX + xOffset * i, lastY - 20, xOffset, 30);
    await sleep(200);
  }

  // typo done, restore fill color
  ctx.fillStyle = currentColor;
};

export const animateText = async (
  canvas: HTMLCanvasElement | null,
  code: string,
  mimicTypos: MimicTypos
): Promise<boolean> => {
  // type guards
  if (!canvas) {
    return false;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }
  if (typeof window === "undefined") {
    return false;
  }

  // font stuff
  const paddingAmountX = 120;
  const paddingAmountY = 170;
  const fontSize = 20;
  const characterOffset = fontSize / 1.7;
  const lineHeight = fontSize * 1.5;
  ctx.font = `bold ${fontSize}px Fira Code`;

  const codeLines = code.split("\n");
  const tokens = (window as any).monaco.editor.tokenize(code, "typescript");

  // add a sleep for a smooth start
  await sleep(500);

  // now loop at each line and each character
  // and color code it based on the token type
  for (let lineIndex = 0; lineIndex < tokens.length; lineIndex++) {
    const sleepAmount = 50;
    // calculate a sleep amount randomly anywhere between 50 - 100 - but this seems to make ffmpeg go haywire
    // const sleepAmount = Math.floor(Math.random() * 50) + 50;
    const lineCharacters = codeLines[lineIndex];
    for (
      let characterIndex = 0;
      characterIndex < lineCharacters.length;
      characterIndex++
    ) {
      console.log("characterIndex", characterIndex);
      // TODO: theme should also come from redux
      const tokenStyle = colorCodeCharacter(
        lineIndex,
        characterIndex,
        tokens,
        Monokai as monaco.editor.IStandaloneThemeData,
        codeLines[lineIndex][characterIndex]
      );
      // TODO: fallback should come from redux
      // TODO: would be also cool to use background color
      // only change if foreground was foreground
      if (tokenStyle.foreground) {
        ctx.fillStyle = tokenStyle.foreground;
      }
      // fill text of character at proper coordinates
      ctx.fillText(
        codeLines[lineIndex][characterIndex],
        characterIndex * characterOffset + paddingAmountX,
        lineIndex * lineHeight + paddingAmountY
      );

      // run typo logic
      await runTypoLogic(
        mimicTypos,
        ctx,
        codeLines[lineIndex][characterIndex],
        characterIndex * characterOffset + paddingAmountX,
        lineIndex * lineHeight + paddingAmountY,
        characterOffset
      );

      console.log({
        color: tokenStyle.foreground,
        character: codeLines[lineIndex][characterIndex],
        x: characterIndex * characterOffset + paddingAmountX,
        y: lineIndex * lineHeight + paddingAmountY,
      });
      // lil' checky sleep to make it look like it's typing
      await sleep(sleepAmount);
    }
    await sleep(sleepAmount);
  }

  // all was well
  console.log("returning true!");
  return true;
};