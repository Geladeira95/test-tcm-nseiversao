//pong game

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 2;

let player1Score = 0;
let player2Score = 0;
let pointsCounter = 0; // Contador de pontos

document.addEventListener('keydown', (event) => {
    // Mover paddle esquerdo com as setas
    if (event.key === 'ArrowUp') {
        paddle1Y = Math.max(0, paddle1Y - 20);
    } else if (event.key === 'ArrowDown') {
        paddle1Y = Math.min(canvas.height - paddleHeight, paddle1Y + 20);
    }
});

// Movimento do paddle direito (IA) seguindo a bola
function movePaddle2() {
    const paddle2Center = paddle2Y + paddleHeight / 2;
    const moveSpeed = 1.5;

    if (ballY < paddle2Center) {
        paddle2Y = Math.max(0, paddle2Y - moveSpeed);
    } else {
        paddle2Y = Math.min(canvas.height - paddleHeight, paddle2Y + moveSpeed);
    }
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = '30px Arial';
    const scoreText = `${player1Score} | ${player2Score}`;
    const textWidth = context.measureText(scoreText).width;
    context.fillText(scoreText, (canvas.width - textWidth) / 2, 30);
}

function drawPoints() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Pontos: ${pointsCounter}`, 10, 30);
}

function draw() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar paddles
    context.fillStyle = 'white';
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Desenhar a bola
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();

    // Movimento da bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisões com as paredes
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão com paddles
    if (
        (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) ||
        (ballX >= canvas.width - paddleWidth && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
        pointsCounter += 10; // Adiciona 10 pontos quando a bola colide com um paddle
    }

    // Verifica se a bola saiu do jogo
    if (ballX < 0) {
        player2Score++; // Jogador 2 ganha ponto
        pointsCounter += 50; // Adiciona 50 pontos quando uma linha é destruída (exemplo)
        resetBall();
    } else if (ballX > canvas.width) {
        player1Score++; // Jogador 1 ganha ponto
        pointsCounter += 50; // Adiciona 50 pontos quando uma linha é destruída (exemplo)
        resetBall();
    }

    // Mover paddle direito (IA)
    movePaddle2();

    // Desenhar a pontuação
    drawScore();
    drawPoints(); // Chama a função para desenhar o contador de pontos

    requestAnimationFrame(draw);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Inverte a direção da bola
}

draw();
