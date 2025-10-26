export class UIController {
  constructor(gameController, renderer) {
    this.gameController = gameController;
    this.gameBoardContainer = document.querySelector(".game-board");
    this.shipBase = document.querySelector(".my-ships");
    this.orientationButton = document.querySelector(".orientation");
    this.gameUiRenderer = renderer;
    this.initOrientationButton();
  }

  initOrientationButton() {
    this.orientationButton.addEventListener("click", () => {
      this.gameController.isHorizontal = !this.gameController.isHorizontal;
      this.gameUiRenderer.updateOrientationButton(this.isHorizontal);
    });
  }

  handleShipClick() {
    // this.gameUiRenderer.hidePlayerTwoBoard();
    this.gameUiRenderer.renderPlacementInfo(
      this.gameController.playerOneName,
      "placement"
    );

    this.shipBase.addEventListener("click", (event) => {
      if (this.gameController.mode !== "placement") return;

      let shipLength = event.target.dataset.length;
      let shipId = event.target.dataset.id;

      if (!shipLength) return;

      this.gameController.shipSelector({ length: shipLength, id: shipId });
    });
  }

  handleCellClick() {
    this.gameBoardContainer.addEventListener("click", (event) => {
      let cell = event.target.dataset.coordinate; // Get cell coordinate from dataset
      if (!cell) return;
      let owner = event.target.dataset.owner;

      if (this.gameController.mode === "attack") {
        this.gameController.handleAttack(cell, owner);
      } else {
        this.gameController.handlePlacement(cell, owner);
      }
    });
  }
}
