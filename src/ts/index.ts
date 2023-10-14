import Board from "./Board.js";
const board = Board()

function createPlayer(symbol, name) {
  const getEmptyCellArray = () => [
    ...document.querySelectorAll(".cell:not(.x):not(.o)"),
  ];

  let isTurnDone = true;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const startTurn = async () => {
    isTurnDone = false;
    const cellClickFunc = (event) => {
      board.editBoard(event.target.getAttribute("data-cell-index"), symbol);
      isTurnDone = true;
    };

    getEmptyCellArray().forEach((cell) => {
      cell.addEventListener("click", cellClickFunc);
    });

    while (true) {
      if (isTurnDone) {
        [...document.querySelectorAll(".cell")].forEach((e) =>
          e.removeEventListener("click", cellClickFunc)
        );
        break;
      } else {
        await sleep(100);
      }
    }
  };
  return { symbol, name, startTurn, isTurnDone };
}

let game = (oPlayer, xPlayer) => {
  const isGameDone = () =>
    board.isWinner(oPlayer.symbol) ||
    board.isWinner(xPlayer.symbol) ||
    board.isFilled();

  const start = async () => {
    while (true) {
      await oPlayer.startTurn();
      if (isGameDone()) {
        break;
      }
      await xPlayer.startTurn();
      if (isGameDone()) {
        break;
      }
    }

    let winnerText: HTMLElement = document.querySelector("#winner-text");
    winnerText.style.display = "block";
    if (board.isWinner(oPlayer.symbol)) {
      winnerText.innerHTML = `${oPlayer.name} has won`;
    } else if (board.isWinner(xPlayer.symbol)) {
      winnerText.innerHTML = `${xPlayer.name} has won`;
    } else if (board.isFilled) {
      winnerText.innerHTML = "TIE!";
    }
    board.reset();
    (document.querySelector("#start-game") as HTMLElement).style.display = "block";
  };
  return { start };
};

function setUpPage() {
  (document.querySelector(".game-elements") as HTMLElement).style.display = "none";
  document.querySelector("#start-game").addEventListener("click", (e) => {
    // @ts-ignore
    game.start();
    (e.target as HTMLElement).style.display = "none";
    (document.querySelector("#winner-text") as HTMLElement).style.display = "none";
  });
}

setUpPage();

document.querySelector("#name-submission").addEventListener("click", () => {
  //@ts-ignore
  game = game(
    //@ts-ignore
    createPlayer("o", document.querySelector("#o-name").value),
    //@ts-ignore
    createPlayer("x", document.querySelector("#x-name").value)
  );
  //@ts-ignore
  document.querySelector(".welcome-screen").style.display = "none";
  //@ts-ignore
  document.querySelector(".game-elements").style.display = "flex";
});
