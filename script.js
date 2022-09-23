(function tictactoe() {
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

    const isFilled = () => !board.includes("empty");

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
    return { drawBoard, isWinner, gameBoard };
  })();

  const getEmptyCellArray = () =>
    [...document.querySelectorAll(".cell:not(.x):not(.o)")];

  function createPlayer(symbol) {
    return { symbol };
  }

  const game = ((board, oPlayer, xPlayer) => {
    const isGameDone = () =>
      board.isWinner(oPlayer.symbol) ||
      board.isWinner(xPlayer.symbol) ||
      board.isFilled();
  })(board, createPlayer("o"), createPlayer("x"));
})();
