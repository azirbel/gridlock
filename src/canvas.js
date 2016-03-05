export default class Canvas {
  constructor(canvas) {
    this.pxSize = 600;
    this.gridSize = 9;

    this.ctx = canvas.getContext('2d');
  }

  _gridToPx(g) {
    return g * this.pxSize / (this.gridSize + 1)
  }

  // Need to convert to use px values
  _drawRectDeprecated(rect, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(...rect);
  }

  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this._gridToPx(x),
      this._gridToPx(y),
      this._gridToPx(radius),
      0,
      Math.PI * 2,
      true);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
