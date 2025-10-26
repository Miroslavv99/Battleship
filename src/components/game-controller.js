export class GameController {
  constructor(playerManager, botController, gameUiRenderer) {
    this.isHorizontal = true;
    this.mode = "placement";
    this.selectedShip = null;
    this.playerManager = playerManager;
    this.botController = botController;
    this.gameUiRenderer = gameUiRenderer;
    this.playerOneBoard = this.playerManager.playerOne.gameBoard;
    this.playerTwoBoard = this.playerManager.playerTwo.gameBoard;
  }

  get playerOneName() {
    return this.playerManager.playerOne.name;
  }

  get playerTwoName() {
    return this.playerManager.playerTwo.name;
  }

  get currentPlayerName() {
    return this.playerManager.currentPlayer.name;
  }

  get currentPlayer() {
    return this.playerManager.currentPlayer;
  }

  shipSelector(ship) {
    this.selectedShip = ship;
  }

  handlePlacement(cell, owner) {
    // Ship placement for player one
    if (!this.playerOneBoard.allShipsPlaced) {
      if (!this.selectedShip) return;
      if (this.playerOneBoard.placedShips.has(this.selectedShip.id)) return;
      if (owner !== "p1") return;

      this.playerOneBoard.placeShip(
        this.isHorizontal,
        Number(this.selectedShip.length),
        this.selectedShip.id,
        cell
      );

      this.gameUiRenderer.markShipCells(
        cell,
        Number(this.selectedShip.length),
        this.isHorizontal,
        "p1"
      );

      if (this.playerOneBoard.allShipsPlaced) {
        this.gameUiRenderer.renderPlacementInfo(this.playerTwoName, this.mode);
        if (this.playerManager.isBotMode) {
          this.gameUiRenderer.showPlayerTwoBoard();
          this.gameUiRenderer.showPlayerOneBoard();
        } else {
          this.gameUiRenderer.showPlayerTwoBoard();
          this.gameUiRenderer.hidePlayerOneBoard();
        }
      }

      if (this.selectedShip) this.selectedShip = null;
    }

    // Ship placement for player Two
    if (this.playerOneBoard.allShipsPlaced) {
      if (this.playerManager.isBotMode) {
        const botShips = this.botController.getBotShips();
        botShips.forEach((ship) => {
          this.playerTwoBoard.placeShip(true, 4, "battleship", ship);
        });
        if (this.playerTwoBoard.allShipsPlaced) {
          this.gameUiRenderer.clearCells();
          this.mode = "attack";
        }
      } else {
        if (!this.selectedShip) return;
        if (this.playerTwoBoard.placedShips.has(this.selectedShip.id)) return;

        if (owner !== "p2") return;
        this.playerTwoBoard.placeShip(
          this.isHorizontal,
          Number(this.selectedShip.length),
          this.selectedShip.id,
          cell
        );

        this.gameUiRenderer.markShipCells(
          cell,
          Number(this.selectedShip.length),
          this.isHorizontal,
          "p2"
        );

        if (this.selectedShip) this.selectedShip = null;

        if (this.playerTwoBoard.allShipsPlaced) {
          console.log(`PLAYER 1: ${this.playerOneBoard.board}`);
          console.log(`PLAYER 2: ${this.playerTwoBoard.board}`);
          this.gameUiRenderer.clearCells();
          this.mode = "attack";
          this.gameUiRenderer.renderPlacementInfo(
            this.currentPlayerName,
            this.mode
          );
          return;
        }
      }
    }
  }

  handleAttack(cell, owner) {
    this.playerManager.attack(cell, owner);
  }
}
