import Board from "./Board.js";
import { gameElements, gameStartBtn, nameSubmission, oInput, welcomeScreen, xInput } from "./Elements.js";
import Game from "./Game.js";
import Player from "./Player.js";
const board = Board()

let game;

function startGame(e: Event) {
  game.start();
  gameStartBtn.style.display = "none";
  (document.querySelector("#winner-text") as HTMLElement).style.display = "none";
}

function intializeGame() {
  game = Game(
    Player("o", oInput.value, board),
    Player("x", xInput.value, board),
    board
  );
  //@ts-ignore
  welcomeScreen.style.display = "none";
  //@ts-ignore
  gameElements.style.display = "flex";

}

gameElements.style.display = "none";
gameStartBtn.addEventListener("click", startGame);
nameSubmission.addEventListener("click", intializeGame);
