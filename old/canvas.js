import * as PointHelpers from './point-helpers';

export default class Canvas {
  constructor(canvasElement) {
    this.pxSize = 600;
    this.gridSize = 9;

    this.ctx = canvasElement.getContext('2d');
  }

  fillBackground() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.pxSize, this.pxSize);
  }

  drawLine(from, to, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(...this._gridToPx(from));
    this.ctx.lineTo(...this._gridToPx(to));
    this.ctx.stroke();
  }

  drawArc(from, to, center, color, isClockwise = true) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      ...this._gridToPx(center),
      this._gridToPx(PointHelpers.getManhattanDistance(from, center)),
      PointHelpers.getCardinalDirection(center, from) * Math.PI / 2,
      PointHelpers.getCardinalDirection(center, to) * Math.PI / 2,
      !isClockwise);
    this.ctx.stroke();
  }

  drawCircle(point, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      this._gridToPx(point[0]),
      this._gridToPx(point[1]),
      this._gridToPx(radius),
      0,
      Math.PI * 2,
      true);
    this.ctx.closePath();
    this.ctx.fill();
  }

  // Handles both arrays and numbers
  _gridToPx(gridThing) {
    if (Array.isArray(gridThing)) {
      return gridThing.map((num) => this._gridToPx(num));
    } else {
      return gridThing * this.pxSize / (this.gridSize + 1)
    }
  }
}
