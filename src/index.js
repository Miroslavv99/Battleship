import "./styles/styles.css";

import { GameUiRenderer } from "./components/controllers/game-ui-renderer.js";
import { PlayerManager } from "./components/controllers/player-manager.js";
import { UIHandler } from "./components/handlers/ui-handler.js";
import { FormHandler } from "./components/handlers/form-handler.js";
import { GameController } from "./components/controllers/game-controller.js";
import { BotController } from "./components/controllers/bot-controller.js";
import { PlacementController } from "./components/controllers/placement-controller.js";

const startButton = document.querySelector(".start");
const menuContainer = document.querySelector(".menu");
const playerForm = document.querySelector(".player-form");
const botButton = document.querySelector(".bot");
const playerButton = document.querySelector(".player");
const restartButton = document.querySelector(".restart");

document.addEventListener("DOMContentLoaded", () => {
  const gameUiRenderer = new GameUiRenderer();
  const botController = new BotController();
  const playerManager = new PlayerManager(botController, gameUiRenderer);
  const formHandler = new FormHandler(playerManager, gameUiRenderer);
  const placementController = new PlacementController(
    playerManager,
    botController,
    gameUiRenderer
  );
  const gameController = new GameController(
    placementController,
    playerManager,
    gameUiRenderer,
    formHandler
  );

  const uiHandler = new UIHandler(
    gameController,
    placementController,
    gameUiRenderer
  );

  gameUiRenderer.renderGrid();
  gameUiRenderer.renderOponentGrid();
  gameUiRenderer.togglePlayerOneBoard();
  gameUiRenderer.togglePlayerTwoBoard();

  startButton.addEventListener("click", () => {
    menuContainer.classList.toggle("showing");
    restartButton.classList.add("showing");
  });

  playerButton.addEventListener("click", () => {
    playerForm.classList.toggle("showing");
    gameController.startPlayersGame();
    uiHandler.handleShipClick();
    uiHandler.handleCellClick();
  });

  botButton.addEventListener("click", () => {
    menuContainer.classList.toggle("showing");
    gameController.startBotGame();
    uiHandler.handleShipClick();
    uiHandler.handleCellClick();
  });

  restartButton.addEventListener("click", () => {
    gameController.restartGame();
    uiHandler.handleShipClick();
    uiHandler.handleCellClick();
  });
});
