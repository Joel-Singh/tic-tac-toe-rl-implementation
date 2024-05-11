import Board from "./Board.js";
import {
  gameElements,
  gameStartBtn,
} from "./Elements.js";
import Game from "./Game.js";
import Player from "./Player.js";
const board = Board()

let game;

function startGame(e: Event) {
  console.log("game starting");
  game.start();
  gameStartBtn.style.opacity = "0";
  (document.querySelector("#winner-text") as HTMLElement).textContent = "";
}

function intializeGame() {
  game = Game(
    Player("o", "User", board),
    Player("x", "Reino", board),
    board
  );
  gameElements.style.display = "grid";
}

gameStartBtn.addEventListener("click", startGame);
intializeGame();
