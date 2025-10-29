import "./styles/styles.css";

import { GameUiRenderer } from "./components/game-ui-renderer.js";
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

document.addEventListener("DOMContentLoaded", () => {
  const gameUiRenderer = new GameUiRenderer();
  const botController = new BotController();
  const playerManager = new PlayerManager(botController, gameUiRenderer);
  const placementController = new PlacementController(
    playerManager,
    botController,
    gameUiRenderer
  );
  const gameController = new GameController(placementController, playerManager);
  const uiHandler = new UIHandler(
    gameController,
    placementController,
    gameUiRenderer
  );
  const formHandler = new FormHandler(playerManager, uiHandler);

  gameUiRenderer.renderGrid();
  gameUiRenderer.renderOponentGrid();
  gameUiRenderer.togglePlayerOneBoard();
  gameUiRenderer.togglePlayerTwoBoard();

  startButton.addEventListener("click", () => {
    menuContainer.classList.toggle("showing");
    startButton.disabled = true;
  });

  playerButton.addEventListener("click", () => {
    playerForm.classList.toggle("showing");
    formHandler.playerFormInit();
  });

  botButton.addEventListener("click", () => {
    playerManager.playerOne.name = "MIRO";
    playerManager.playerTwo.name = "BOT";
    playerManager.isBotMode = true;
    menuContainer.classList.toggle("showing");
    uiHandler.handleShipClick();
    uiHandler.handleCellClick();
  });
});
