const board = (() => {
  const gameBoard = [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ];

  const getCell = (index) => {
    return document.querySelector(`.cell[data-cell-index='${index}']`);
  };

  const isFilled = () => !gameBoard.includes("empty");

  const drawBoard = () => {
    gameBoard.forEach((marking, index) => {
      if (marking === "o") {
        getCell(index).classList.add("o");
      } else if (marking === "x") {
        getCell(index).classList.add("x");
      }
    });
  };

  const isWinner = (symbol) => {
    const check = (index) => gameBoard[index] === symbol;
    const firstColCheck = check(0) && check(3) && check(6);
    const secondColCheck = check(1) && check(4) && check(7);
    const thirdColCheck = check(2) && check(5) && check(8);
    const firstRowCheck = check(0) && check(1) && check(2);
    const secondRowCheck = check(3) && check(4) && check(5);
    const thirdRowCheck = check(6) && check(7) && check(8);
    const firstDiagCheck = check(0) && check(4) && check(8);
    const secondDiagCheck = check(2) && check(4) && check(6);
    return (
      firstColCheck ||
      secondColCheck ||
      thirdColCheck ||
      firstRowCheck ||
      secondRowCheck ||
      thirdRowCheck ||
      firstDiagCheck ||
      secondDiagCheck
    );
  };

  const editBoard = (index, symbol) => {
    gameBoard[index] = symbol;
    drawBoard();
  }
  return { isWinner, isFilled, editBoard };
})();

function createPlayer(symbol) {
  const getEmptyCellArray = () => [
    ...document.querySelectorAll(".cell:not(.x):not(.o)"),
  ];

  let isTurnDone = true;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const startTurn = async () => {
    isTurnDone = false;
    const abortController = new AbortController();
    const cellClickFunc = (event) => {
      board.editBoard(event.target.getAttribute("data-cell-index"), symbol);
      isTurnDone = true;
    };

    getEmptyCellArray().forEach((cell) => {
      cell.addEventListener("click", cellClickFunc, {
        signal: abortController.signal,
      });
    });

    while (true) {
      if (isTurnDone) {
        abortController.abort();
        break;
      } else {
        await sleep(100);
      }
    }
  };
  return { symbol, startTurn, isTurnDone };
}

const game = ((oPlayer, xPlayer) => {
  const isGameDone = () =>
    board.isWinner(oPlayer.symbol) ||
    board.isWinner(xPlayer.symbol) ||
    board.isFilled();

  const start = async () => {
    while (true) {
      await oPlayer.startTurn();
      await xPlayer.startTurn();
    }
  };
  return { start };
})(createPlayer("o"), createPlayer("x"));

game.start();
