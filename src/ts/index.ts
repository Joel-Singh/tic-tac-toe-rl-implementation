import Board from "./Board.js";
import Game from "./Game.js";
import Player from "./Player.js";
const board = Board()

let game;

(document.querySelector(".game-elements") as HTMLElement).style.display = "none";
document.querySelector("#start-game").addEventListener("click", (e) => {
  // @ts-ignore
  game.start();
  (e.target as HTMLElement).style.display = "none";
  (document.querySelector("#winner-text") as HTMLElement).style.display = "none";
});

document.querySelector("#name-submission").addEventListener("click", () => {
  game = Game(
    Player("o", (document.querySelector("#o-name") as HTMLInputElement).value, board),
    Player("x", (document.querySelector("#x-name") as HTMLInputElement).value, board),
    board
  );
  //@ts-ignore
  document.querySelector(".welcome-screen").style.display = "none";
  //@ts-ignore
  document.querySelector(".game-elements").style.display = "flex";
});
