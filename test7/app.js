
import {Vector} from "./vector.js"
import {Line} from "./line.js"


class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.mousePos = new Vector();
    this.isMouseDown = false;

    this.currentLine = null;
    this.lines = [];

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));

    window.addEventListener("pointerdown", this.onPointerDown.bind(this), false);
    window.addEventListener("pointermove", this.onPointerMove.bind(this), false);
    window.addEventListener("pointerup", this.onPointerUp.bind(this), false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

  }

  onPointerDown(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
    if (e.button == 0) {
      this.isMouseDown = true;

      let newLine = new Line(this.mousePos.clone(), "#0095DD");
      this.currentLine = newLine;
      this.lines.push(newLine);
    }
    else if (e.button == 1) {
      
      this.currentLine = null;
      this.lines = [];
    }
  }

  onPointerMove(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
    if (this.isMouseDown) {
      this.currentLine.setEnd(this.mousePos.clone());
    }
  }

  onPointerUp(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
    if (e.button == 0) {
      this.isMouseDown = false;
      this.currentLine = null;
    }
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // this.ctx.beginPath();
    // this.ctx.arc(this.mousePos.x, this.mousePos.y, 5, 0, Math.PI*2);
    // this.ctx.fillStyle = "#0095DD";
    // this.ctx.fill();
    // this.ctx.closePath();

    for (let line of this.lines) {
      line.draw(this.ctx);
    }
  }
}


window.onload = () => {
  new App();
};

