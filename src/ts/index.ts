import Board from "./Board.js";
import Game from "./Game.js";
import Player from "./Player.js";
const board = Board()

let game;

function startGame(e: Event) {
  game.start();
  (e.target as HTMLElement).style.display = "none";
  (document.querySelector("#winner-text") as HTMLElement).style.display = "none";
}

function intializeGame() {
  game = Game(
    Player("o", (document.querySelector("#welcome-screen__name-input__o") as HTMLInputElement).value, board),
    Player("x", (document.querySelector("#welcome-screen__name-input__x") as HTMLInputElement).value, board),
    board
  );
  //@ts-ignore
  document.querySelector(".welcome-screen").style.display = "none";
  //@ts-ignore
  document.querySelector(".game-elements").style.display = "flex";

}

(document.querySelector(".game-elements") as HTMLElement).style.display = "none";
document.querySelector("#start-game").addEventListener("click", startGame);
document.querySelector("#name-submission").addEventListener("click", intializeGame);
