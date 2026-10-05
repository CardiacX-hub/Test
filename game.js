const cells = Array.from(document.querySelectorAll('.cell'));
const status = document.querySelector('#status');
const players = { X: document.querySelector('#player-x'), O: document.querySelector('#player-o') };
const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board = Array(9).fill('');
let turn = 'X';
let finished = false;

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i] === 'X' ? '✕' : board[i] === 'O' ? '○' : '';
    cell.disabled = finished || Boolean(board[i]);
    cell.classList.toggle('x', board[i] === 'X');
    cell.classList.toggle('o', board[i] === 'O');
    cell.setAttribute('aria-label', `Row ${Math.floor(i / 3) + 1}, column ${i % 3 + 1}, ${board[i] || 'empty'}`);
  });
  Object.entries(players).forEach(([symbol, player]) => player.classList.toggle('active', !finished && symbol === turn));
}

cells.forEach((cell, i) => cell.addEventListener('click', () => {
  if (finished || board[i]) return;
  board[i] = turn;
  const win = lines.find(line => line.every(index => board[index] === turn));
  if (win) {
    finished = true;
    status.textContent = `${turn} wins! Nicely played.`;
    win.forEach(index => cells[index].classList.add('winner'));
  } else if (board.every(Boolean)) {
    finished = true;
    status.textContent = 'It’s a draw! Try another round.';
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    status.textContent = `${turn}’s turn`;
  }
  render();
}));

document.querySelector('#restart').addEventListener('click', () => {
  board = Array(9).fill('');
  turn = 'X';
  finished = false;
  status.textContent = 'X’s turn';
  cells.forEach(cell => cell.classList.remove('winner'));
  render();
});
render();
