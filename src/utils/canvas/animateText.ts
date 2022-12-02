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

export const animateText = (canvas: HTMLCanvasElement | null, text: string) => {
  if (!canvas) {
    return;
  }
  var ctx = canvas.getContext("2d");
  if (ctx !== null) {
    ctx.font = "12px monospace";
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
  var words = str.split(" ");
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
