import Board from "./Board.js";
import {
  gameElements,
  gameStartBtn,
  nameSubmission,
  oInput,
  welcomeScreen,
  welcomeScreenNameErrors,
  xInput
} from "./Elements.js";
import Game from "./Game.js";
import Player from "./Player.js";
const board = Board()

let game;

function startGame(e: Event) {
  game.start();
  gameStartBtn.style.opacity = "0";
  (document.querySelector("#winner-text") as HTMLElement).textContent = "";
}

function intializeGame() {
  const inputsEmpty = oInput.value === '' || xInput.value === '';
  if (inputsEmpty) {
    welcomeScreenNameErrors.textContent = 'Names need to be filled in'
    return
  }

  game = Game(
    Player("o", oInput.value.trim(), board),
    Player("x", xInput.value.trim(), board),
    board
  );
  welcomeScreen.style.display = "none";
  gameElements.style.display = "grid";

}

gameElements.style.display = "none";
gameStartBtn.addEventListener("click", startGame);
nameSubmission.addEventListener("click", intializeGame);
