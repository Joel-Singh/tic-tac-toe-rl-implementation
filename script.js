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

    const drawBoard = () => {
      gameBoard.forEach((marking, index) => {
        if (marking === "o") {
          document
            .querySelector(`.cell[data-cell-index='${index}']`)
            .classList.add("o");
        } else if (marking === "x") {
          document
            .querySelector(`.cell[data-cell-index='${index}']`)
            .classList.add("x");
        }
      });
    };

    const checkForWinner = (symbol) => {
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
    return { drawBoard, checkForWinner };
  })();

  board.drawBoard();
})();
