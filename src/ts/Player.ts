import { BoardType } from "./Board";

export default function Player(isAi: boolean, symbol: 'o' | 'x', name, board: BoardType) {
  const getEmptyCellArray = () => [
    ...document.querySelectorAll(".cell:not(.x):not(.o)"),
  ];

  const getAllCellsArray = () => [
    ...document.querySelectorAll(".cell"),
  ]

  function addClickEventToEmptyCells(clickEvent: EventListener) {
    getEmptyCellArray().forEach((cell) => {
      cell.addEventListener("click", clickEvent);
    });
  }

  function removeClickEventFromCells(clickEvent: EventListener) {
    getAllCellsArray().forEach((e) =>
      e.removeEventListener("click", clickEvent)
    );
  }

  const startTurn = async () => {
    const manualTurn = new Promise<void>((resolve) => {
      addClickEventToEmptyCells(handleCellClick)

      function handleCellClick(event: Event) {
        const cell = event.target as HTMLElement
        const cellIndex = cell.getAttribute("data-cell-index")
        board.editBoard(cellIndex, symbol)
        removeClickEventFromCells(handleCellClick)
        resolve();
      }
    })

    const aiTurn = new Promise<void>((resolve) => {})

    return isAi ? aiTurn : manualTurn;
  };
  return { symbol, name, startTurn };
}

export type PlayerType = ReturnType<typeof Player>;
