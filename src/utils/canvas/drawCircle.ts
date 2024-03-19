export const drawCircle = (ctx: CanvasRenderingContext2D, x:number, y: number, radius: number, fill: string, stroke?: string, strokeWidth?: number) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }
    if (stroke && strokeWidth) {
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
  }

export const drawWatermark = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number) => {
  ctx.font = "50px Monospace";
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
  ctx.font = "20px Monospace";
  ctx.fillText("https://codevideo.io", x+70, y + 30);
}