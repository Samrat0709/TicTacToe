const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

  if (!gameActive || clickedCell.textContent !== '') {
    return;
  }

  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  if (checkForWin()) {
    endGame(false);
  } else if (isBoardFull()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkForWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent &&
      cells[a].textContent !== ''
    ) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function endGame(isDraw) {
  gameActive = false;

  if (isDraw) {
    alert('It\'s a draw!');
  } else {
    alert(`Player ${currentPlayer} wins!`);
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

