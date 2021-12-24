
class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = 0;
  }

  setY(y) {
    this.y = y;
    this.vy = 0;
  }
}


export class DotsController {
  constructor(nDivides) {
    this.nDivides = nDivides;
    this.nDots = nDivides + 3;

    this.lastTime = 0;

    this.k = 20;
    this.decayPerSecond = 0.8;
  }

  initialize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.originY = this.stageHeight / 2;

    this.gap = this.stageWidth / this.nDivides;
    
    this.dots = [];

    for (let i = 0; i < this.nDots; i++) {
      this.dots[i] = new Dot((i-1) * this.gap, 0);
    }

    // this.dots[0].vy = 1000;
    this.dots[5].vy = 1000;
    // this.dots[8].vy = -500;
  }

  draw(t, ctx) {
    let dt = (t - this.lastTime) / 1000;
    this.lastTime = t;
    // console.log(dt);
    this.update(dt);

    for (let dot of this.dots) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y + this.originY, 3, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    
    ctx.beginPath();

    let prev = this.dots[1];
    let prevCx = (this.dots[0].x + prev.x) / 2;
    let prevCy = (this.dots[0].y + prev.y) / 2;


    ctx.moveTo(prevCx, prevCy + this.originY);

    for (let i = 2; i < this.nDots; i++) {
      let cur = this.dots[i];

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y + this.originY, cx, cy + this.originY);

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y + this.originY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.dots[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }

  update(dt) {
    let decay = Math.pow(this.decayPerSecond, dt);
    for (let i = 0; i < this.nDots; i++) {
      this.dots[i].vy -= this.k * this.dots[i].y * dt;

      let meanY = 0;
      if (i > 0) meanY += this.dots[i-1].y;
      if (i < this.nDots - 1) meanY += this.dots[i+1].y;
      if ((i > 0) && (i < this.nDots - 1)) meanY *= 0.5;

      this.dots[i].vy += 10 * (meanY) * dt;
    }

    for (let i = 0; i < this.nDots; i++) {
      let dy = this.dots[i].vy * dt;
      this.dots[i].y += dy;

      // let relavance = 0.5 * 0.5;
      // if (i > 0) this.dots[i-1].y -= dy * relavance;
      // if (i < this.nDots - 1) this.dots[i+1].y -= dy * relavance;

      this.dots[i].vy *= decay;
    }

  }
}

