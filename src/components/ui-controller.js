export class UIController {
  constructor(gameController, renderer) {
    this.mode = "placement"; // Current mode: "placement" or "attack"
    this.selectedShip = null;
    this.gameBoardContainer = document.querySelector(".game-board");
    this.playerOneCells = document.querySelector(".grid-one");
    this.playerTwoCells = document.querySelector(".grid-two");
    this.shipBase = document.querySelector(".my-ships");
    this.playerTwoShips = document.querySelector(".opponent-ships");
    this.gameController = gameController;
    this.renderer = renderer;
  }

  shipSelector() {
    if (this.mode === "attack") return;

    this.renderer.hidePlayerTwoBoard();
    this.renderer.renderBattleInfo(
      `Player ${this.gameController.playerOne.name} Put Your Ships`
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

      if (this.mode === "placement") {
        if (!this.gameController.playerOne.gameBoard.allShipsPlaced) {
          if (!this.selectedShip) return;
          if (
            this.gameController.playerOne.gameBoard.placedShips.has(
              this.selectedShip.id
            )
          )
            return;
          if (owner === "p1") {
            this.gameController.playerOne.gameBoard.placeShip(
              Number(this.selectedShip.length),
              this.selectedShip.id,
              cell
            );
          }

          if (this.gameController.playerOne.gameBoard.allShipsPlaced) {
            this.renderer.renderBattleInfo(
              `Player ${this.gameController.playerTwo.name} Put Your Ships`
            ); // Prompt next player
            this.renderer.showPlayerTwoBoard(); // Show Player Two's board
            this.renderer.hidePlayerOneBoard(); // Hide Player One's board
          }

          if (this.selectedShip) this.selectedShip = null;
        }

        if (this.gameController.playerOne.gameBoard.allShipsPlaced) {
          if (!this.selectedShip) return;
          if (
            this.gameController.playerTwo.gameBoard.placedShips.has(
              this.selectedShip.id
            )
          )
            return;
          if (owner === "p2") {
            this.gameController.playerTwo.gameBoard.placeShip(
              Number(this.selectedShip.length),
              this.selectedShip.id,
              cell
            );

            if (this.selectedShip) this.selectedShip = null;

            if (this.gameController.playerTwo.gameBoard.allShipsPlaced) {
              this.mode = "attack"; // Switch to attack mode after all ships placed
              return;
            }
          }
        }
      }

      if (
        this.mode === "attack" &&
        this.gameController.currentPlayer === this.gameController.playerTwo &&
        owner === "p1" &&
        !this.gameController.checkWinner()
      ) {
        let attackInfo = this.gameController.currentPlayer.attack(cell); // Perform attack
        if (attackInfo) {
          this.renderer.markCell(`p1-${cell}`, "hit"); // Mark hit
          this.renderer.renderBattleInfo(
            `Hit! Player ${this.gameController.playerTwo.name} attack again!`
          );
        } else {
          if (this.gameController.checkWinner()) {
            this.renderer.markCell(`p1-${cell}`, "hit"); // Last hit during victory
            this.renderer.renderBattleInfo(
              `Player ${this.gameController.currentPlayer.name} Win!`
            );
          } else {
            this.renderer.markCell(`p1-${cell}`, "miss"); // Mark miss
            this.renderer.renderBattleInfo(
              `Miss! Player ${this.gameController.playerOne.name} attack!`
            );
          }
        }
      }

      if (
        this.mode === "attack" &&
        this.gameController.currentPlayer === this.gameController.playerOne &&
        owner === "p2" &&
        !this.gameController.checkWinner()
      ) {
        let attackInfo = this.gameController.currentPlayer.attack(cell);
        if (attackInfo) {
          this.renderer.markCell(`p2-${cell}`, "hit");
          this.renderer.renderBattleInfo(
            `Hit! Player ${this.gameController.playerOne.name} attack again!`
          );
        } else {
          if (this.gameController.checkWinner()) {
            this.renderer.markCell(`p2-${cell}`, "hit");
            this.renderer.renderBattleInfo(
              `Player ${this.gameController.currentPlayer.name} Win!`
            );
          } else {
            this.renderer.markCell(`p2-${cell}`, "miss");
            this.renderer.renderBattleInfo(
              `Miss! Player ${this.gameController.playerTwo.name} attack!`
            );
          }
        }
      }
    });
  }
}
