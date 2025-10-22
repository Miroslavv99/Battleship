import "./styles/styles.css";

import { GameUiRenderer } from "./components/renderer.js";
import { GameController } from "./components/game-controller.js";
import { UIController } from "./components/ui-controller.js";
import { FormHandler } from "./components/form-handler.js";

const startButton = document.querySelector(".start");
const menuContainer = document.querySelector(".menu");
const playerForm = document.querySelector(".player-form");
const botButton = document.querySelector(".bot");
const playerButton = document.querySelector(".player");

document.addEventListener("DOMContentLoaded", () => {
  const gameUiRenderer = new GameUiRenderer();
  const gameController = new GameController(gameUiRenderer);
  const uiController = new UIController(gameController, gameUiRenderer);
  const formHandler = new FormHandler(gameController, uiController);

  gameUiRenderer.renderGrid();
  gameUiRenderer.renderOponentGrid();
  gameUiRenderer.showPlayerOneBoard();
  gameUiRenderer.renderBattleInfo("Wellcome to the Battleship game!");

  startButton.addEventListener("click", () => {
    menuContainer.classList.toggle("showing");
    startButton.disabled = true;
  });

  playerButton.addEventListener("click", () => {
    playerForm.classList.toggle("showing");
    formHandler.playerFormInit();
  });

  botButton.addEventListener("click", () => {
    gameController.isBotMode = true;
    menuContainer.classList.toggle("showing");
    uiController.shipSelector();
    uiController.handleCellClick();
  });
});
