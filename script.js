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
    return { drawBoard };
  })();

  board.drawBoard();
})();
