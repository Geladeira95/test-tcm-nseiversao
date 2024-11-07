const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20); // Escala o canvas para facilitar a manipulação

let board = Array.from({ length: 20 }, () => Array(10).fill(0));
let pieces = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 1], [0, 1]], // J
    [[1, 1, 1], [1, 0]], // L
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1]], // S
    [[1, 1, 1], [0, 0, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // Z
];

let currentPiece;
let position = { x: 3, y: 0 };
let dropInterval = 1000; // Intervalo inicial de queda
let lastDropTime = 0;

function getRandomPiece() {
    return pieces[Math.floor(Math.random() * pieces.length)];
}

function resetGame() {
    board = Array.from({ length: 20 }, () => Array(10).fill(0));
    currentPiece = getRandomPiece();
    position = { x: 3, y: 0 };
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece(currentPiece, position);
}

function drawBoard() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x]) {
                context.fillStyle = 'blue';
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}

function drawPiece(piece, pos) {
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = 'red';
                context.fillRect(pos.x + x, pos.y + y, 1, 1);
            }
        });
    });
}

function update(currentTime) {
    if (currentTime - lastDropTime > dropInterval) {
        position.y++;
        lastDropTime = currentTime;

        if (collision()) {
            position.y--;
            merge();
            clearLines(); // Verifica e limpa linhas completas
            currentPiece = getRandomPiece();
            position = { x: 3, y: 0 };
            if (collision()) {
                alert('Game Over!');
                resetGame();
            }
        }
    }
    draw();
}

function collision() {
    return currentPiece.some((row, y) => {
        return row.some((value, x) => {
            if (value) {
                const newX = position.x + x;
                const newY = position.y + y;
                return newX < 0 || newX >= 10 || newY >= 20 || (newY >= 0 && board[newY][newX]);
            }
            return false;
        });
    });
}

function merge() {
    currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[position.y + y][position.x + x] = 1;
            }
        });
    });
}

function clearLines() {
    board = board.filter(row => row.some(value => value === 0)); // Mantém linhas incompletas
    const linesCleared = 20 - board.length; // Número de linhas que foram completadas
    while (board.length < 20) {
        board.unshift(Array(10).fill(0)); // Adiciona linhas vazias no topo
    }
    // Se precisar, você pode adicionar um sistema de pontuação ou efeitos sonoros aqui
}

function move(dir) {
    position.x += dir;
    if (collision()) {
        position.x -= dir; // Desfaz o movimento se houver colisão
    }
}

function rotate() {
    const rotatedPiece = currentPiece[0].map((_, index) => currentPiece.map(row => row[index]).reverse());
    const originalPiece = currentPiece;
    currentPiece = rotatedPiece;
    if (collision()) {
        currentPiece = originalPiece; // Reverte a rotação se houver colisão
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        move(-1);
    } else if (event.key === 'ArrowRight') {
        move(1);
    } else if (event.key === 'ArrowDown') {
        position.y++;
        if (collision()) {
            position.y--; // Desfaz se houver colisão
        }
    } else if (event.key === 'ArrowUp') {
        rotate(); // Gira a peça
    }
});

// Inicia o jogo
resetGame();
function gameLoop(currentTime) {
    update(currentTime);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
