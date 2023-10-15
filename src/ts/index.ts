import Board from "./Board.js";
import Game from "./Game.js";
const board = Board()

function createPlayer(symbol: 'o' | 'x', name) {
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

let game;

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
  game = Game(
    //@ts-ignore
    createPlayer("o", document.querySelector("#o-name").value),
    //@ts-ignore
    createPlayer("x", document.querySelector("#x-name").value),
    board
  );
  //@ts-ignore
  document.querySelector(".welcome-screen").style.display = "none";
  //@ts-ignore
  document.querySelector(".game-elements").style.display = "flex";
});
