
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var isMouseDown = false;
var mouseStartX = 0;
var mouseStartY = 0;
var mouseX = 0;
var mouseY = 0;

var speedRatio = 0.1;
var tempBall;


class Ball {
  constructor(x, y, radius, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = radius;

    this.vx = vx | 0;
    this.vy = vy | 0;
    this.enable = true;
  }
}

var balls = [];

function mouseDownHandler(e) {
  isMouseDown = true;
  if (e.button == 0) {
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
  } 
}

function mouseUpHandler(e) {
  if (e.button == 0 && isMouseDown) {
    var diffX = mouseStartX - mouseX;
    var diffY = mouseStartY - mouseY;


    balls.push(new Ball(mouseStartX, mouseStartY, 5, diffX*speedRatio, diffY*speedRatio));
  } 
  isMouseDown = false;
  console.log(balls);
}

function mouseMoveHandler(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}


canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", mouseUpHandler);


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
    ball.vy += 0.25;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y > canvas.height + ball.r)
      ball.enable = false;
  }
  
  balls = balls.filter(function(ball) {return ball.enable});
}

function drawCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBalls();
  
  if (isMouseDown) {
    ctx.beginPath(); 
    ctx.moveTo(mouseStartX, mouseStartY); 
    ctx.lineTo(mouseX, mouseY); 
    ctx.stroke(); 
  }
}

function mainLoop() {
  update();
  drawCanvas();
}

setInterval(mainLoop, 1000 / 60);

