const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("[data-reset-button]");
const playerX = document.querySelector("[data-playerX]");
const playerO = document.querySelector("[data-playerO]");

let currentPlayer = "X";
let gameActive = true;
let board = new Array(9).fill("");

const handleCellClick = (e) => {
     const id = Number(e.target.dataset.index); // turn index dataset into Number
     if (!gameActive || board[id]) return; // if gameActive is false or board is full stop
     board[id] = currentPlayer;
     e.target.textContent = currentPlayer;

     if (currentPlayer == "X") {
          e.target.style.color = "red";
     } else {
          e.target.style.color = "#1976d2";
     }

     const winner = checkWin();

     if (winner) {
          gameActive = false;
          setTimeout(() => alert(`${winner} wins!`), 100);
          return;
     }
     if (checkDraw()) {
          gameActive = false;
          setTimeout(() => alert("It's a draw!"), 100);
          return;
     }

     currentPlayer = currentPlayer === "X" ? "O" : "X"; // if current player equal x or will o

     if (currentPlayer == "X") {
          playerX.classList.add("active");
          playerO.classList.remove("active");
     } else {
          playerO.classList.add("active");
          playerX.classList.remove("active");
     }
};

const checkWin = () => {
     const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], // rows
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], // cols
          [0, 4, 8],
          [2, 4, 6], // diags
     ];
     for (let pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
               return board[a];
          }
     }
};

const checkDraw = () => {
     const boardNotEmpty = board.every((cell) => cell !== "") && !checkWin();
     return boardNotEmpty;
};

const resetGame = () => {
     board = new Array(9).fill("");
     currentPlayer = "X";
     gameActive = true;
     cells.forEach((cell) => (cell.textContent = ""));
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
