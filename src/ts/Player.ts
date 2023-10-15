import { BoardType } from "./Board";

export default function Player(symbol: 'o' | 'x', name, board: BoardType) {
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
