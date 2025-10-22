export class UIController {
  constructor(gameController, renderer) {
    this.mode = "placement";
    this.selectedShip = null;
    this.isHorizontal = true;
    this.gameController = gameController;
    this.playerOneBoard = this.gameController.playerOne.gameBoard;
    this.playerTwoBoard = this.gameController.playerTwo.gameBoard;
    this.orientationButton = document.querySelector(".orientation");
    this.gameBoardContainer = document.querySelector(".game-board");
    this.playerOneCells = document.querySelector(".grid-one");
    this.playerTwoCells = document.querySelector(".grid-two");
    this.shipBase = document.querySelector(".my-ships");
    this.gameUiRenderer = renderer;
    this.initOrientationButton();
  }

  get playerOneName() {
    return this.gameController.playerOne.name;
  }

  get playerTwoName() {
    return this.gameController.playerTwo.name;
  }

  get currentPlayer() {
    return this.gameController.currentPlayer;
  }

  initOrientationButton() {
    this.orientationButton.addEventListener("click", () => {
      this.isHorizontal = !this.isHorizontal;
      this.gameUiRenderer.updateOrientationButton(this.isHorizontal);
      console.log(this.isHorizontal);
    });
  }

  shipSelector() {
    if (this.mode === "attack") return;

    this.gameUiRenderer.hidePlayerTwoBoard();
    this.gameUiRenderer.renderBattleInfo(
      `Player ${this.playerOneName} Put Your Ships`
    );

    this.shipBase.addEventListener("click", (event) => {
      let shipLength = event.target.dataset.length; // Get ship length from clicked element
      let shipId = event.target.dataset.id; // Get ship ID

      if (!shipLength) return;

      this.selectedShip = {
        length: shipLength,
        id: shipId,
      };
      console.log(this.selectedShip); // Log selected ship
    });
  }

  handleCellClick() {
    this.gameBoardContainer.addEventListener("click", (event) => {
      let cell = event.target.dataset.coordinate; // Get cell coordinate from dataset
      if (!cell) return;
      let owner = event.target.dataset.owner;

      if (this.mode === "attack") {
        this.handleAttack(cell, owner);
      } else {
        this.handlePlacement(cell, owner);
      }
    });
  }

  handleAttack(cell, owner) {
    if (
      this.currentPlayer === this.gameController.playerTwo &&
      owner === "p1" &&
      !this.gameController.checkWinner()
    ) {
      let attackInfo = this.currentPlayer.attack(cell); // Perform attack
      if (attackInfo) {
        this.gameUiRenderer.markCell(`p1-${cell}`, "hit"); // Mark hit
        this.gameUiRenderer.renderBattleInfo(
          `Hit! Player ${this.playerTwoName} attack again!`
        );
      } else {
        if (this.gameController.checkWinner()) {
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
      this.currentPlayer === this.gameController.playerOne &&
      owner === "p2" &&
      !this.gameController.checkWinner()
    ) {
      let attackInfo = this.currentPlayer.attack(cell);
      if (attackInfo) {
        this.gameUiRenderer.markCell(`p2-${cell}`, "hit");
        this.gameUiRenderer.renderBattleInfo(
          `Hit! Player ${this.playerOneName} attack again!`
        );
      } else {
        if (this.gameController.checkWinner()) {
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

  handlePlacement(cell, owner) {
    // Ship placement for player one
    if (!this.playerOneBoard.allShipsPlaced) {
      if (!this.selectedShip) return;
      if (this.playerOneBoard.placedShips.has(this.selectedShip.id)) {
        return;
      }

      if (owner === "p1") {
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
      }

      if (this.playerOneBoard.allShipsPlaced) {
        this.gameUiRenderer.renderBattleInfo(
          `Player ${this.playerTwoName} Put Your Ships`
        );
        this.gameUiRenderer.showPlayerTwoBoard();
        this.gameUiRenderer.hidePlayerOneBoard();
      }

      if (this.selectedShip) this.selectedShip = null;
    }

    // Ship placement for player Two
    if (this.playerOneBoard.allShipsPlaced) {
      if (!this.selectedShip) return;
      if (this.playerTwoBoard.placedShips.has(this.selectedShip.id)) return;

      if (owner === "p2") {
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
}
