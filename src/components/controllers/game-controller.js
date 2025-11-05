import { GameBoard } from "../core/game-board.js";

export class GameController {
  constructor(placementController, playerManager, gameUiRenderer) {
    this.mode = "placement";
    this.placementController = placementController;
    this.playerManager = playerManager;
    this.gameUiRenderer = gameUiRenderer;
  }

  restartGame() {
    this.mode = "placement";
    this.playerManager.playerOneBoard = new GameBoard();
    this.playerManager.playerTwoBoard = new GameBoard();

    this.playerManager.playerOne.gameBoard = this.playerManager.playerOneBoard;
    this.playerManager.playerTwo.gameBoard = this.playerManager.playerTwoBoard;

    this.gameUiRenderer.clearCells();
  }

  handlePlacement(cell, owner) {
    const placementDone = this.placementController.placePlayerShips(
      cell,
      owner
    );
    if (placementDone) this.mode = "attack";
  }

  handleAttack(cell, owner) {
    this.playerManager.attack(cell, owner);
  }
}
