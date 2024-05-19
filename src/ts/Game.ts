import { BoardType } from "./Board";
import { currentPlayerTurn, winnerText } from "./Elements.js";
import { PlayerType } from "./Player";
import { Policy, createAllPossiblePolicies } from "./Policies";

export default function Game(oPlayer: PlayerType, xPlayer: PlayerType, board: BoardType) {
  const isGameDone = () =>
    board.isWinner(oPlayer.symbol) ||
    board.isWinner(xPlayer.symbol) ||
    board.isFilled();

  async function playerTurn(player: PlayerType, policy: Policy) {
    currentPlayerTurn.textContent = `It's your turn, ${player.name}`
    await player.startTurn(policy, board);
    currentPlayerTurn.textContent = ''
  }

  const start = async () => {
    let currentPolicy = createAllPossiblePolicies();
    while (true) {
      await playerTurn(oPlayer, currentPolicy)
      currentPolicy = currentPolicy.possibleMoves[board.getLastEditedIndex()];
      if (isGameDone()) {
        break;
      }
      await playerTurn(xPlayer, currentPolicy)
      currentPolicy = currentPolicy.possibleMoves[board.getLastEditedIndex()];
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
