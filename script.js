const gameArea = document.getElementById('gameArea');
const ball = document.getElementById('ball');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');

let ballSpeedX = 4;
let ballSpeedY = 4;
let ballPosX = ball.offsetLeft;
let ballPosY = ball.offsetTop;
let paddle1PosY = paddle1.offsetTop;
let paddle2PosY = paddle2.offsetTop;
const paddleSpeed = 20;
const gameHeight = gameArea.offsetHeight;
const gameWidth = gameArea.offsetWidth;

document.addEventListener('keydown', movePaddles);

function movePaddles(e) {
  if (e.key === 'ArrowUp' && paddle2PosY > 0) {
    paddle2PosY -= paddleSpeed;
    paddle2.style.top = `${paddle2PosY}px`;
  } else if (e.key === 'ArrowDown' && paddle2PosY < gameHeight - paddle2.offsetHeight) {
    paddle2PosY += paddleSpeed;
    paddle2.style.top = `${paddle2PosY}px`;
  }

  if (e.key === 'w' && paddle1PosY > 0) {
    paddle1PosY -= paddleSpeed;
    paddle1.style.top = `${paddle1PosY}px`;
  } else if (e.key === 's' && paddle1PosY < gameHeight - paddle1.offsetHeight) {
    paddle1PosY += paddleSpeed;
    paddle1.style.top = `${paddle1PosY}px`;
  }
}

function updateBall() {
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  if (ballPosY <= 0 || ballPosY >= gameHeight - ball.offsetHeight) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballPosX <= paddle1.offsetWidth && ballPosY >= paddle1PosY && ballPosY <= paddle1PosY + paddle1.offsetHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballPosX >= gameWidth - paddle2.offsetWidth - ball.offsetWidth && ballPosY >= paddle2PosY && ballPosY <= paddle2PosY + paddle2.offsetHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballPosX <= 0 || ballPosX >= gameWidth - ball.offsetWidth) {
    resetBall();
  }

  ball.style.left = `${ballPosX}px`;
  ball.style.top = `${ballPosY}px`;
}

function resetBall() {
  ballPosX = gameWidth / 2 - ball.offsetWidth / 2;
  ballPosY = gameHeight / 2 - ball.offsetHeight / 2;
  ballSpeedX = -ballSpeedX;
}

setInterval(updateBall, 30);
