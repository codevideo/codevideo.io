import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { colorCodeCharacter } from "../tokens/colorCodeCharacter";
import { sleep } from "../sleep";

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

export const animateTextNew = async (
  canvas: HTMLCanvasElement | null,
  code: string
): Promise<boolean> => {
  if (!canvas) {
    return false;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return false;
  }

  ctx.font = "30px Fira Code";

  // first tokenize the text using monaco's powerful tokenizer
  // for now due dumb sleep until bug is resolved, see: https://github.com/microsoft/monaco-editor/issues/3448
  // monaco.editor.tokenize(`// My awesome TypeScript function!
  // export const areEqual = (a: number, b: number): boolean => {
  //     return a === b;
  // }`, "typescript");

  const codeSplit = code.split('\n')

  const tokens = JSON.parse('[[{"offset":0,"type":"comment.ts","language":"typescript"}],[{"offset":0,"type":"keyword.ts","language":"typescript"},{"offset":6,"type":"","language":"typescript"},{"offset":7,"type":"keyword.ts","language":"typescript"},{"offset":12,"type":"","language":"typescript"},{"offset":13,"type":"identifier.ts","language":"typescript"},{"offset":21,"type":"","language":"typescript"},{"offset":22,"type":"delimiter.ts","language":"typescript"},{"offset":23,"type":"","language":"typescript"},{"offset":24,"type":"delimiter.parenthesis.ts","language":"typescript"},{"offset":25,"type":"identifier.ts","language":"typescript"},{"offset":26,"type":"delimiter.ts","language":"typescript"},{"offset":27,"type":"","language":"typescript"},{"offset":28,"type":"keyword.ts","language":"typescript"},{"offset":34,"type":"delimiter.ts","language":"typescript"},{"offset":35,"type":"","language":"typescript"},{"offset":36,"type":"identifier.ts","language":"typescript"},{"offset":37,"type":"delimiter.ts","language":"typescript"},{"offset":38,"type":"","language":"typescript"},{"offset":39,"type":"keyword.ts","language":"typescript"},{"offset":45,"type":"delimiter.parenthesis.ts","language":"typescript"},{"offset":46,"type":"delimiter.ts","language":"typescript"},{"offset":47,"type":"","language":"typescript"},{"offset":48,"type":"keyword.ts","language":"typescript"},{"offset":55,"type":"","language":"typescript"},{"offset":56,"type":"delimiter.ts","language":"typescript"},{"offset":58,"type":"","language":"typescript"},{"offset":59,"type":"delimiter.bracket.ts","language":"typescript"}],[{"offset":0,"type":"","language":"typescript"},{"offset":4,"type":"keyword.ts","language":"typescript"},{"offset":10,"type":"","language":"typescript"},{"offset":11,"type":"identifier.ts","language":"typescript"},{"offset":12,"type":"","language":"typescript"},{"offset":13,"type":"delimiter.ts","language":"typescript"},{"offset":16,"type":"","language":"typescript"},{"offset":17,"type":"identifier.ts","language":"typescript"},{"offset":18,"type":"delimiter.ts","language":"typescript"}],[{"offset":0,"type":"delimiter.bracket.ts","language":"typescript"}]]')

  console.log('tokens', tokens);

  console.log(Monokai.rules)

  // now loop at each line and each character
  // and color code it based on the token type
  for (let lineIndex = 0; lineIndex < tokens.length; lineIndex++) {
    console.log("lineIndex", lineIndex);
    // const lineTokens = tokens[lineIndex];
    const lineCharacters = codeSplit[lineIndex];
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
        codeSplit[lineIndex][characterIndex]
      );
      // TODO: fallback should come from redux
      // TODO: would be also cool to use background color
      // only change if foreground was foreground
      if (tokenStyle.foreground) {
        ctx.fillStyle = tokenStyle.foreground
      }
      // fill text of character at proper coordinates
      ctx.fillText(
        codeSplit[lineIndex][characterIndex],
        characterIndex * 20,
        lineIndex * 40 + 40
      );
      console.log({
        color: tokenStyle.foreground,
        character: codeSplit[lineIndex][characterIndex],
        x: characterIndex * 20,
        y: lineIndex * 40 + 40,
      })
      // lil' checky sleep to make it look like it's typing
      await sleep(50);
    }
    await sleep(50);
  }

  // all was well
  console.log('returning true!')
  return true;
};

export const animateText = (canvas: HTMLCanvasElement | null, text: string) => {
  if (!canvas) {
    return;
  }
  var ctx = canvas.getContext("2d");

  if (ctx !== null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // create full background rect with black color
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "12px Fira Code";
    ctx.fillStyle = "white";

    var story1: IStory = {
      txt: text,
      storycount: 0,
      linecount: 0,
      lineheight: 18,
      xpos: 10,
      ypos: 50,
      startY: 50,
      speed: 2,
      animate: true,
      complete: false,
      storyarr: [],
    };

    var animate = setInterval(() => {
      if (ctx !== null) {
        doAnimation(story1, ctx);
      }
    }, 50);

    story1.storyarr = getLines(ctx, story1.txt, 10, 500);
  }
};
function doAnimation(story: IStory, ctx: CanvasRenderingContext2D) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  animateTxt(story, ctx);
}

function getLines(
  context: CanvasRenderingContext2D,
  str: string,
  x: number,
  maxWidth: number
): Array<string> {
  //adapt from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  var words = str.split(/" "|\n/);
  var lineNumber = 0;
  var linesarr = [];
  var lineOfText = "";
  for (var n = 0; n < words.length; n++) {
    var checkEndOfLine = lineOfText + words[n] + " ";
    var checkTextWidth = context.measureText(checkEndOfLine);
    var textWidth = checkTextWidth.width;

    if (textWidth > maxWidth - 10) {
      lineNumber++;
      lineOfText = words[n] + " ";
    } else {
      lineOfText = checkEndOfLine;
    }
    linesarr[lineNumber] = lineOfText;
  }
  return linesarr;
}

function animateTxt(story: IStory, context: CanvasRenderingContext2D) {
  if (story.animate) {
    story.storycount += story.speed;
    var storytxt = story.storyarr[story.linecount];
    story.ypos = story.startY + story.lineheight * story.linecount;
    if (story.storycount > storytxt.length - 1) {
      story.storycount = 0;
      story.linecount++;

      if (story.linecount > story.storyarr.length - 1) {
        //clearInterval(intervalID);
        story.animate = false;
        story.complete = true;
      }
    }
    //context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillText(
      storytxt.substr(0, story.storycount),
      story.xpos,
      story.ypos
    );
  }
  //Write Out The Previous Lines Too
  for (var i = 0; i < story.storyarr.length; i++) {
    if (i < story.linecount) {
      context.fillText(
        story.storyarr[i],
        story.xpos,
        story.startY + story.lineheight * i
      );
    }
  }
}
