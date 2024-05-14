import { BoardType } from "./Board";
import { currentPlayerTurn, winnerText } from "./Elements.js";
import { PlayerType } from "./Player";

export default function Game(oPlayer: PlayerType, xPlayer: PlayerType, board: BoardType) {
  const isGameDone = () =>
    board.isWinner(oPlayer.symbol) ||
    board.isWinner(xPlayer.symbol) ||
    board.isFilled();

  async function playerTurn(player: PlayerType) {
    currentPlayerTurn.textContent = `It's your turn, ${player.name}`
    await player.startTurn()
    currentPlayerTurn.textContent = ''
  }

  const start = async () => {
    while (true) {
      await playerTurn(oPlayer)
      if (isGameDone()) {
        break;
      }
      await playerTurn(xPlayer)
      if (isGameDone()) {
        break;
      }
    }

    winnerText.style.display = "block";
    if (board.isWinner(oPlayer.symbol)) {
      winnerText.innerHTML = `${oPlayer.name} has won`;
    } else if (board.isWinner(xPlayer.symbol)) {
      winnerText.innerHTML = `${xPlayer.name} has won`;
    } else if (board.isFilled()) {
      winnerText.innerHTML = "TIE!";
    }
    (document.querySelector("#start-game") as HTMLElement).style.opacity = "1";
  };
  return { start };
};
