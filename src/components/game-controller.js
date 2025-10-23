export class GameController {
  constructor(playerManager, gameUiRenderer) {
    this.isHorizontal = true;
    this.mode = "placement";
    this.selectedShip = null;
    this.playerManager = playerManager;
    this.gameUiRenderer = gameUiRenderer;
    this.orientationButton = document.querySelector(".orientation");
    this.playerOneBoard = this.playerManager.playerOne.gameBoard;
    this.playerTwoBoard = this.playerManager.playerTwo.gameBoard;
    this.cellsArray = this.getCellsArray();
    this.initOrientationButton();
  }

  get playerOneName() {
    return this.playerManager.playerOne.name;
  }

  get playerTwoName() {
    return this.playerManager.playerTwo.name;
  }

  get currentPlayer() {
    return this.playerManager.currentPlayer;
  }

  initOrientationButton() {
    this.orientationButton.addEventListener("click", () => {
      this.isHorizontal = !this.isHorizontal;
      this.gameUiRenderer.updateOrientationButton(this.isHorizontal);
      console.log(this.isHorizontal);
    });
  }

  shipSelector(ship) {
    this.selectedShip = ship;
  }

  getCellsArray() {
    let cells = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        cells.push(`${i},${j}`);
      }
    }
    return cells;
  }

  getBotShips() {
    return ["0,0", "1,0"];
  }

  placeBotShips() {
    let botCells = this.getBotShips();
    for (let i = 0; i < botCells.length; i++) {
      this.playerTwoBoard.placeShip(true, 4, "battleship", botCells[i]);
    }
    if (this.playerTwoBoard.allShipsPlaced) {
      this.gameUiRenderer.clearCells();
      this.gameUiRenderer.renderBattleInfo(
        `Player ${this.currentPlayer.name} attack!`
      );
      this.mode = "attack";
    }
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
        this.gameUiRenderer.renderBattleInfo(
          `Player ${this.playerTwoName} Put Your Ships`
        );
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
        this.placeBotShips();
        console.log(this.playerTwoBoard.board);
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
          this.gameUiRenderer.clearCells();
          this.gameUiRenderer.renderBattleInfo(
            `Player ${this.currentPlayer.name} attack!`
          );
          this.mode = "attack";
          return;
        }
      }
    }
  }

  handleAttack(cell, owner) {
    if (
      this.currentPlayer === this.playerManager.playerTwo &&
      owner === "p1" &&
      !this.playerManager.checkWinner()
    ) {
      let attackInfo = this.currentPlayer.attack(cell); // Perform attack
      if (attackInfo) {
        this.gameUiRenderer.markCell(`p1-${cell}`, "hit"); // Mark hit
        this.gameUiRenderer.renderBattleInfo(
          `Hit! Player ${this.playerTwoName} attack again!`
        );
      } else {
        if (this.playerManager.checkWinner()) {
          this.gameUiRenderer.markCell(`p1-${cell}`, "hit"); // Last hit during victory
          this.gameUiRenderer.renderBattleInfo(
            `Player ${this.currentPlayer.name} Win!`
          );
        } else {
          this.gameUiRenderer.markCell(`p1-${cell}`, "miss"); // Mark miss
          this.gameUiRenderer.renderBattleInfo(
            `Miss! Player ${this.playerOneName} attack!`
          );
        }
      }
    }

    if (
      this.currentPlayer === this.playerManager.playerOne &&
      owner === "p2" &&
      !this.playerManager.checkWinner()
    ) {
      let attackInfo = this.currentPlayer.attack(cell);
      if (attackInfo) {
        this.gameUiRenderer.markCell(`p2-${cell}`, "hit");
        this.gameUiRenderer.renderBattleInfo(
          `Hit! Player ${this.playerOneName} attack again!`
        );
      } else {
        if (this.playerManager.checkWinner()) {
          this.gameUiRenderer.markCell(`p2-${cell}`, "hit");
          this.gameUiRenderer.renderBattleInfo(
            `Player ${this.currentPlayer.name} Win!`
          );
        } else {
          this.gameUiRenderer.markCell(`p2-${cell}`, "miss");
          this.gameUiRenderer.renderBattleInfo(
            `Miss! Player ${this.playerTwoName} attack!`
          );
        }
      }
    }
  }
}
