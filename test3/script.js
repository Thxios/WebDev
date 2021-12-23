
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var isMouseDown = false;
var mouseX = 0;
var mouseY = 0;


class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.r = radius;

    this.dy = -5;
    this.enable = true;
  }
}

var balls = [];

function mouseDownHandler(e) {
  isMouseDown = true;
  if (e.button == 0) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  } 
  else if (e.button == 1) {
    balls = [];
  }
}

function mouseUpHandler(e) {
  isMouseDown = false;
  if (e.button == 0) {
    balls.push(new Ball(mouseX, mouseY, 5));
  } 
  // console.log(balls);
}


document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mouseup", mouseUpHandler);


function drawBalls() {
  for (var ball of balls) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

function update() {
  for (var ball of balls) {
    ball.dy += 0.25;
    ball.y += ball.dy;
    if (ball.y > canvas.height + ball.r)
      ball.enable = false;
  }
  
  balls = balls.filter(function(ball) {return ball.enable});
}

function drawCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBalls();
}

function mainLoop() {
  update();
  drawCanvas();
}

setInterval(mainLoop, 1000 / 60);

