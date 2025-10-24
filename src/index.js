import "./styles/styles.css";

import { GameUiRenderer } from "./components/renderer.js";
import { PlayerManager } from "./components/player-manager.js";
import { UIController } from "./components/ui-controller.js";
import { FormHandler } from "./components/form-handler.js";
import { GameController } from "./components/game-controller.js";
import { BotController } from "./components/bot-controller.js";

const startButton = document.querySelector(".start");
const menuContainer = document.querySelector(".menu");
const playerForm = document.querySelector(".player-form");
const botButton = document.querySelector(".bot");
const playerButton = document.querySelector(".player");

document.addEventListener("DOMContentLoaded", () => {
  const gameUiRenderer = new GameUiRenderer();
  const botController = new BotController();
  const playerManager = new PlayerManager(botController, gameUiRenderer);
  const gameController = new GameController(
    playerManager,
    botController,
    gameUiRenderer
  );
  const uiController = new UIController(gameController, gameUiRenderer);
  const formHandler = new FormHandler(playerManager, uiController);

  gameUiRenderer.renderGrid();
  gameUiRenderer.renderOponentGrid();
  gameUiRenderer.showPlayerOneBoard();
  gameUiRenderer.showPlayerTwoBoard();

  // gameUiRenderer.renderBattleInfo("Wellcome to the Battleship game!");

  startButton.addEventListener("click", () => {
    menuContainer.classList.toggle("showing");
    startButton.disabled = true;
  });

  playerButton.addEventListener("click", () => {
    playerForm.classList.toggle("showing");
    formHandler.playerFormInit();
  });

  botButton.addEventListener("click", () => {
    playerManager.isBotMode = true;
    menuContainer.classList.toggle("showing");
    uiController.handleShipClick();
    uiController.handleCellClick();
    gameUiRenderer.showPlayerOneBoard();
    gameUiRenderer.showPlayerTwoBoard();
    playerManager.playerOne.name = "MIRO";
    playerManager.playerTwo.name = "BOT";
  });
});
