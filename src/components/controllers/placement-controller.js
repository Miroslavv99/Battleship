export class PlacementController {
  constructor(playerManager, botController, gameUiRenderer) {
    this.botController = botController;
    this.playerManager = playerManager;
    this.gameUiRenderer = gameUiRenderer;
    // this.playerOneBoard = this.playerManager.playerOne.gameBoard;
    // this.playerTwoBoard = this.playerManager.playerTwo.gameBoard;
    this.selectedShip = null;
    this.isHorizontal = true;
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

  get playerOneBoard() {
    return this.playerManager.playerOne.gameBoard;
  }

  get playerTwoBoard() {
    return this.playerManager.playerTwo.gameBoard;
  }

  shipSelector(ship) {
    this.selectedShip = ship;
  }

  placeBotShips() {
    while (!this.playerTwoBoard.allShipsPlaced) {
      let shipLength = this.botController.botShips.shift();
      let cell = this.botController.getBotPlacementCell();
      let put = this.playerTwoBoard.placeShip(
        this.isHorizontal,
        shipLength,
        "battleship",
        cell
      );

      if (!put) {
        while (put) {
          let cell = this.botController.getBotPlacementCell();
          put = this.playerTwoBoard.placeShip(
            this.isHorizontal,
            shipLength,
            "battleship",
            cell
          );
        }
      }
      this.playerTwoBoard.allShipsPlaced;
    }
  }

  placePlayerShips(cell, owner) {
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
        this.gameUiRenderer.updatePlacementInfo(this.playerTwoName, this.mode);
        if (this.playerManager.isBotMode) {
          this.gameUiRenderer.showAllBoards();
        } else {
          this.gameUiRenderer.togglePlayerOneBoard();
          this.gameUiRenderer.togglePlayerTwoBoard();
        }
      }

      if (this.selectedShip) this.selectedShip = null;
    }

    // Ship placement for player Two
    if (this.playerOneBoard.allShipsPlaced) {
      if (this.playerManager.isBotMode) {
        this.placeBotShips();
        this.gameUiRenderer.updatePlacementInfo(
          this.currentPlayerName,
          "attack"
        );
        console.log(this.playerTwoBoard.placedShips);
        if (this.playerTwoBoard.allShipsPlaced) {
          this.gameUiRenderer.clearCells();
          return true;
        }
      } else {
        if (!this.selectedShip) return;
        if (this.playerTwoBoard.placedShips.has(this.selectedShip.id)) return;

        if (owner !== "p2") return;
        console.log(this.selectedShip);
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
          this.gameUiRenderer.clearCells();
          this.gameUiRenderer.updatePlacementInfo(
            this.currentPlayerName,
            "attack"
          );
          return true;
        }
      }
    }
  }
}
