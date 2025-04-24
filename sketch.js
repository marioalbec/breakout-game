let paddle;
let ball;
let blocks = [];
let level = 1;
let score = 0;
let lives = 3;
let gameStarted = false;

function setup() {
  createCanvas(800, 600);
  paddle = new Paddle();
  ball = new Ball();
  setupLevel(level);
}

function draw() {
  background(30);
  drawHUD();
  paddle.display();
  paddle.update();
  ball.display();
  if (gameStarted) ball.update(paddle, blocks);
  
  blocks.forEach(block => block.display());

  if (blocks.every(b => b.broken)) {
    nextLevel();
  }

  if (ball.y > height) {
    lives--;
    if (lives > 0) {
      resetRound();
    } else {
      gameOver();
    }
  }
}

function drawHUD() {
  fill(255);
  textSize(16);
  text(`Puntos: ${score} | Vidas: ${lives} | Nivel: ${level}`, 20, 20);
  if (!gameStarted) {
    textSize(20);
    text("Presiona ESPACIO para lanzar la pelota", width/2 - 150, height/2);
  }
}

function keyPressed() {
  if (keyCode === 32 && !gameStarted) {
    gameStarted = true;
  }
}

function resetRound() {
  ball.reset();
  paddle.reset();
  gameStarted = false;
}

function setupLevel(lvl) {
  blocks = [];
  let rows = lvl;
  let cols = 10;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let strength = 1;
      if (lvl === 2 && r === 0 && c === 5) strength = 3;
      if (lvl === 3) {
        if ((r === 0 && c === 2) || (r === 1 && c === 7)) strength = 3;
        if (r === 2 && c === 4) strength = -1; // bloque irrompible
      }
      blocks.push(new Block(c * 80, 50 + r * 30, strength));
    }
  }
}

function nextLevel() {
  level++;
  if (level > 3) {
    alert("¡Ganaste el juego!");
    noLoop();
  } else {
    setupLevel(level);
    resetRound();
    ball.speedUp(level);
  }
}

function gameOver() {
  alert("Juego Terminado. Puntuación final: " + score);
  noLoop();
}
