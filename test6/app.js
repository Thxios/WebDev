import {
  DotsController
} from "./dots.js";


class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.dotsController = new DotsController(10);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {   
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.initialize();
  }

  initialize() {
    this.dotsController.initialize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.dotsController.draw(t, this.ctx);

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.stageHeight / 2);
    this.ctx.lineTo(this.stageWidth, this.stageHeight / 2);
    this.ctx.stroke();
      
    
  }
}


window.onload = () => {
  new App();
}

