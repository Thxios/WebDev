
import {Vector} from "./vector.js"


export class Line {
  constructor(start, color) {
    this.start = start;
    this.color = color;

    this.end = new Vector(this.start.x, this.start.y);
    this.vector = this.end.subtract(this.start);
  }

  setEnd(end) {
    this.end.x = end.x;
    this.end.y = end.y;
    this.vector.x = this.end.x - this.start.x;
    this.vector.y = this.end.y - this.start.y;
  }

  toRelative(point) {
    return point.subtract(this.start);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.start.x, this.start.y, 4, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.end.x, this.end.y, 4, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  }
}

