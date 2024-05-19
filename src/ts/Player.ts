import { BoardType } from "./Board";
import { Policy } from "./Policies";

export default function Player(isAi: boolean, symbol: 'o' | 'x', name, board: BoardType) {
  const getEmptyCellArray = (): HTMLElement[] => [
    ...document.querySelectorAll(".cell:not(.x):not(.o)"),
  ] as HTMLElement[];

  const getAllCellsArray = () => [
    ...document.querySelectorAll(".cell"),
  ] as HTMLElement[];

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

  const startTurn = async (policy: Policy, board: BoardType) => {
    return new Promise<void>((resolve) => {
      addClickEventToEmptyCells(handleCellClick)
      if (isAi) {
        const allCellArray = getAllCellsArray();
        const possibleNextMoves: Policy[] = policy.possibleMoves;

        let indexOfHighestValueMove: number = 0;
        for (let i = 1; i < possibleNextMoves.length; i++) {
          const currentValue = possibleNextMoves[i]?.value ?? 0;
          const highestValue = possibleNextMoves[indexOfHighestValueMove]?.value ?? 0;
          indexOfHighestValueMove = currentValue > highestValue ? i : indexOfHighestValueMove;
        }

        allCellArray[indexOfHighestValueMove].click();
      }

      function handleCellClick(event: Event) {
        const cell = event.target as HTMLElement
        const cellIndex = cell.getAttribute("data-cell-index")
        board.editBoard(cellIndex, symbol)
        removeClickEventFromCells(handleCellClick)
        resolve();
      }
    })
  };
  return { symbol, name, startTurn };
}

export type PlayerType = ReturnType<typeof Player>;
