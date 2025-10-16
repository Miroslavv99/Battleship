import "./styles/styles.css";

import { Renderer } from "./components/renderer.js";
import { GameController } from "./components/game-controller.js";
import { UIController } from "./components/ui-controller.js";
import { FormHandler } from "./components/form-handler.js";

const startButton = document.querySelector(".start");
const menu = document.querySelector(".menu");
const playerForm = document.querySelector(".player-form");
const botButton = document.querySelector(".bot");
const playerButton = document.querySelector(".player");

const renderer = new Renderer();
const gameController = new GameController(renderer);

document.addEventListener("DOMContentLoaded", () => {
  renderer.renderGrid();
  renderer.renderOponentGrid();
  renderer.showPlayerOneBoard();
  renderer.renderBattleInfo("Wellcome to the Battleship game!");

  const uiController = new UIController(gameController, renderer);
  const formHandler = new FormHandler(gameController, uiController);

  startButton.addEventListener("click", () => {
    menu.classList.toggle("showing");
    startButton.disabled = true;
  });

  playerButton.addEventListener("click", () => {
    playerForm.classList.toggle("showing");
    formHandler.playerFormInit();
  });
});
