
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


export class Wave {
  constructor(nDivides) {
    this.nDivides = nDivides;
    this.nDots = nDivides + 1;

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
      this.dots[i] = new Dot(i * this.gap, 0);
    }

    this.dots[0].vy = -1000;
  }

  draw(t, ctx) {
    let dt = (t - this.lastTime) / 1000;
    this.lastTime = t;
    // console.log(dt);
    this.update(dt);

    for (let dot of this.dots) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y + this.originY, 5, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }

  update(dt) {
    let decay = Math.pow(this.decayPerSecond, dt);
    for (let i = 0; i < this.nDots; i++) {
      let dv = this.k * this.dots[i].y * dt;
      this.dots[i].vy -= dv;

      let meanY = 0;
      if (i > 0) meanY += this.dots[i-1].y;
      if (i < this.nDots - 1) meanY += this.dots[i+1].y;
      if ((i > 0) && (i < this.nDots - 1)) meanY *= 0.5;

      this.dots[i].vy += this.k * (meanY - this.dots[i].y) * dt;
    }

    for (let i = 0; i < this.nDots; i++) {
      let dy = this.dots[i].vy * dt;
      this.dots[i].y += dy;

      this.dots[i].vy *= decay;

    }

  }
}

