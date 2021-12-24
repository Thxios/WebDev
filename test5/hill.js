export class Hill {
  constructor(color, speed, total) {
    this.color = color;
    this.speed = speed;
    this.total = total;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = [];
    this.gap = Math.ceil(this.stageWidth / this.total);

    for (let i = 0; i < 1+this.total+3; i++) {
      this.points[i] = {
        x: (i-1) * this.gap,
        y: this.getY()
      };
    }
    console.log(this.points);
    // console.log(this.stageWidth, this.stageHeight);
    // console.log(this.points);
  } 

  draw(ctx) {
    for (var point of this.points) {
      point.x += this.speed;
    }
    if (this.points[0].x > -this.gap) {
      this.points.unshift({
        x: this.points[0].x - this.gap,
        y: this.getY()
      });
      this.points.pop();
    }


    ctx.fillStyle = this.color;
    ctx.beginPath();

    let prev = this.points[1];
    let prevCx = (this.points[0].x + prev.x) / 2;
    let prevCy = (this.points[0].y + prev.y) / 2;

    let dots = [];

    ctx.moveTo(prevCx, prevCy);

    for (let i = 2; i < this.points.length; i++) {
      let cur = this.points[i];

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();

    for (var dot of dots) {
      ctx.beginPath();
      ctx.arc(dot.x1, dot.y1, 5, 0, Math.PI*2);
      ctx.fillStyle = "#009500";
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(dot.x2, dot.y2, 5, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    return dots;
  }

  getY() {
    const min = this.stageHeight / 8;
    const max = this.stageHeight - min;
    return min + max * Math.random();
  }
}


