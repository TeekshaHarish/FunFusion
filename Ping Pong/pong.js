const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Paddle A
let paddleA = {
  x: 50,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  dy: 0,
};

// Paddle B
let paddleB = {
  x: canvas.width - 60,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  dy: 0,
};

// Ball
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 5,
  dy: 5,
};

// Draw paddles
function drawPaddles() {
  ctx.fillStyle = "white";
  ctx.fillRect(paddleA.x, paddleA.y, paddleA.width, paddleA.height);
  ctx.fillRect(paddleB.x, paddleB.y, paddleB.width, paddleB.height);
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Move paddles
function movePaddles() {
  paddleA.y += paddleA.dy;
  paddleB.y += paddleB.dy;

  // Keep paddles within canvas bounds
  paddleA.y = Math.max(0, Math.min(paddleA.y, canvas.height - paddleA.height));
  paddleB.y = Math.max(0, Math.min(paddleB.y, canvas.height - paddleB.height));
}

// Scores
let player1Score = 0;
let player2Score = 0;

// Move ball
function moveBall() {
  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (top and bottom)
  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    ball.dy *= -1;
  }

  // Ball out of bounds (right side)
  if (ball.x + ball.radius >= canvas.width) {
    // Reset ball position
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    // Increment player 1 score
    player1Score++;
  }

  // Ball out of bounds (left side)
  if (ball.x - ball.radius <= 0) {
    // Reset ball position
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    // Increment player 2 score
    player2Score++;
  }

  // Paddle collision (player 1)
  if (
    ball.x - ball.radius <= paddleA.x + paddleA.width &&
    ball.y >= paddleA.y &&
    ball.y <= paddleA.y + paddleA.height
  ) {
    ball.dx *= -1;
  }

  // Paddle collision (player 2)
  if (
    ball.x + ball.radius >= paddleB.x &&
    ball.y >= paddleB.y &&
    ball.y <= paddleB.y + paddleB.height
  ) {
    ball.dx *= -1;
  }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
    drawScores();
}

// Draw scores
function drawScores() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Player 1: " + player1Score, 20, 30);
    ctx.fillText("Player 2: " + player2Score, canvas.width - 140, 30);
}


// Update game objects
function update() {
  movePaddles();
  moveBall();
}

// Game loop
function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

// Keyboard event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    paddleA.dy = -5;
  } else if (event.key === "s") {
    paddleA.dy = 5;
  } else if (event.key === "ArrowUp") {
    paddleB.dy = -5;
  } else if (event.key === "ArrowDown") {
    paddleB.dy = 5;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "s") {
    paddleA.dy = 0;
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    paddleB.dy = 0;
  }
});

// Start the game loop
gameLoop();
