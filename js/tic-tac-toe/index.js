let turn = "x";
let symbols = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const board = document.querySelector(".board");
const tiles = Array.from(document.querySelectorAll(".tile"));

board.addEventListener("click", ({ target }) => {
  const classes = Array.from(target.classList);
  if (classes.includes("tile") && classes.length !== 1) return;

  const idx = tiles.indexOf(target);

  target.classList.add(`tile-${turn}`);
  symbols[idx % 3][Math.floor(idx / 3)] = turn;
  checkWin(turn);
  turn = turn === "x" ? "o" : "x";
  displayTurn(turn);
});

function displayTurn(turn) {
  // 1. zmień text elementu h1 z klasą "turn" zależnie od tego, czyja jest aktualnie tura
  const turnElement = document.querySelector(".turn");
  turnElement.textContent = `${turn.toUpperCase()} turn`;
}

function checkWin(turn) {
  // 2. sprawdź czy któryś z graczy wygrał pojedynek - jeśli tak wyświetla komunikat (możesz użyć np. funkcji "alert(...)")
  const winnerS = "";
  if (
    winner(symbols[0][0], symbols[0][1], symbols[0][2]) ||
    winner(symbols[1][0], symbols[1][1], symbols[1][2]) ||
    winner(symbols[2][0], symbols[2][1], symbols[2][2]) ||
    winner(symbols[0][0], symbols[1][0], symbols[2][0]) ||
    winner(symbols[0][1], symbols[1][1], symbols[2][1]) ||
    winner(symbols[0][2], symbols[1][2], symbols[2][2]) ||
    winner(symbols[0][0], symbols[1][1], symbols[2][2]) ||
    winner(symbols[0][2], symbols[1][1], symbols[2][0])
  ) {
    setTimeout(() => {
      alert(`${turn.toUpperCase()} won!`);
      reset();
    }, 100);
  } else if (draw()) {
    setTimeout(() => {
      alert("Game Over - no one won!");
      reset();
    }, 100);
  }
}

function winner(first, second, third) {
  if (first === "") return false;
  if (first !== second) return false;
  if (first !== third) return false;
  return true;
}

function draw() {
  const elements = symbols.flat();
  for (const symbol of elements) {
    if (symbol === "") return false;
  }
  return true;
}

// 3. dodaj listener pod przycisk z napisaem "reset" tak, aby po jego kliknięciu wywołać funkcję reset
const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", reset);

function reset() {
  // 4. zresetuj stan gry
  tiles.forEach((tile) => {
    tile.classList.remove("tile-o");
    tile.classList.remove("tile-x");
  });
  symbols = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}
