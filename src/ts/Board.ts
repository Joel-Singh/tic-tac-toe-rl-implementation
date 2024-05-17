export default function Board() {
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
      } else if (marking === "empty") {
        getCell(index).classList.remove("x");
        getCell(index).classList.remove("o");
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

  let lastEditedIndex: number | null = null;
  const getLastEditedIndex = () => lastEditedIndex;

  const editBoard = (index, symbol) => {
    gameBoard[index] = symbol;
    lastEditedIndex = index;
    drawBoard();
  };

  const reset = () => {
    gameBoard.fill("empty");
    drawBoard();
  };

  const getFilledSquares = () => {
    return 9 - gameBoard.filter(v => v === 'empty').length;
  }

  return { isWinner, isFilled, editBoard, reset, getLastEditedIndex, getFilledSquares };
};

export type BoardType = ReturnType<typeof Board>;
