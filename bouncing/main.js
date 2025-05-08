// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const para = document.getElementById('para');
var count = 25;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// function to avoid overlaps

function avoidOverlap(ball1, ball2, distance, dx, dy) { 
  const overlap = ball1.size + ball2.size - distance;
  const correctionX = (dx / distance) * (overlap / 2);
  const correctionY = (dy / distance) * (overlap / 2);

  ball1.x += correctionX;
  ball1.y += correctionY;
  ball2.x -= correctionX;
  ball2.y -= correctionY;
}


// constructor function

function Shape(x, y, velX, velY) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = true;
}

function Ball(x, y, velX, velY, color, size){
  Shape.call(this, x, y, velX, velY);
  this.color = color;
  this.size=  size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function EvilCircle(x, y) {
  Shape.call(this, x, y, 20, 20);
  this.color = "white";
  this.size = 80;
}

// Evil Circle

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
  if( (this.x + this.size) >= width ){
    this.x -= this.size;
  } 
  if ( (this.x - this.size) <= 0){
    this.x += this.size;
  }
  if ( (this.y + this.size) >= height ){
    this.y -= this.size;
  }
  if ( (this.y - this.size) <= 0){
    this.y += this.size;
  }
}

EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e){
    if (e.key == "a"){
      _this.x -= _this.velX;
    } else if (e.key == "d") {
      _this.x += _this.velX;
    } else if (e.key == "w") {
      _this.y -= _this.velY;
    } else if (e.key == "s") {
      _this.y += _this.velY;
    }
  }
}

EvilCircle.prototype.collisionDetect = function() {
  balls.forEach(ball => {
    if (ball.exists) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.exists = false;
        count--;
        para.textContent = `Balls: ${count}`;
      }
    }
  });
}

// Balls

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if( (this.x + this.size) >= width ){
    this.velX = -this.velX;
    this.color = randomRGB();
  } 
  if ( (this.x - this.size) <= 0){
    this.velX = - this.velX;
    this.color = randomRGB();
  }
  if ( (this.y + this.size) >= height ){
    this.velY = -this.velY
    this.color = randomRGB();
  }
  if ( (this.y - this.size) <= 0){
    this.velY = - this.velY;
    this.color = randomRGB();
  }
  
  this.x = this.x + this.velX;
  this.y = this.y + this.velY;
}

Ball.prototype.collisionDetect = function() {
  balls.forEach(ball => {
    if(ball != this && ball.exists){
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx*dx + dy*dy); // removendo valores negativos - não existe distância negativa

      // avoid ball overlaps
      
      if(distance < this.size + ball.size){
        // colidiram
        this.color = ball.color = randomRGB();
        this.velX = -this.velX;
        this.velY = -this.velY;
        avoidOverlap(this, ball, distance, dx, dy);

        // correçao do bug que as bolinhas travam umas nas outras
      }
    }
  });
}

let balls = [];

while (balls.length <= count) {
  let size = random(10, 20);
  let color = randomRGB();

  let ball = new Ball(
    random( 0 + size, width - size ),
    random( 0 + size, height - size ),
    random( -7, 7),
    random(-7, 7),
    color,
    size
  );

  balls.push(ball);
}

let evil = new EvilCircle(random(0, width), random(0, height), true);
evil.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball =>{
    if (ball.exists){
      ball.update();
      ball.collisionDetect();
      ball.draw();
    }
  })

  evil.checkBounds();
  evil.collisionDetect();
  evil.draw();

  requestAnimationFrame(loop);
}

loop();