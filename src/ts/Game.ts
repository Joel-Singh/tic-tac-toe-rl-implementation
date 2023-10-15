import { BoardType } from "./Board";
import { winnerText } from "./Elements.js";

export default function Game(oPlayer, xPlayer, board: BoardType) {
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
