import { GameBoard } from "../core/game-board.js";

export class GameController {
  constructor(placementController, playerManager, gameUiRenderer, formHandler) {
    this.mode = "placement";
    this.placementController = placementController;
    this.playerManager = playerManager;
    this.gameUiRenderer = gameUiRenderer;
    this.formHandler = formHandler;
  }

  startPlayersGame() {
    this.formHandler.playerFormInit();
    this.gameUiRenderer.showAllBoards();
    this.restartGame();
  }

  startBotGame() {
    this.playerManager.playerOne.name = "";
    this.playerManager.playerTwo.name = "AI";
    this.playerManager.isBotMode = true;
    this.restartGame();
  }

  restartGame() {
    this.mode = "placement";
    this.playerManager.playerOneBoard = new GameBoard();
    this.playerManager.playerTwoBoard = new GameBoard();
    this.gameUiRenderer.showAllBoards();

    this.playerManager.playerOne.gameBoard = this.playerManager.playerOneBoard;
    this.playerManager.playerTwo.gameBoard = this.playerManager.playerTwoBoard;
    this.playerManager.currentPlayer = this.playerManager.playerOne;

    this.gameUiRenderer.clearCells();
  }

  handlePlacement(cell, owner) {
    const placementDone = this.placementController.placePlayerShips(
      cell,
      owner
    );
    setTimeout(() => {
      if (placementDone) this.mode = "attack";
    }, 100);
  }

  handleAttack(cell, owner) {
    this.playerManager.attack(cell, owner);
  }
}
