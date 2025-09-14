export class FormHandler {
  constructor(gameController, uiController) {
    this.menuContainer = document.querySelector(".menu");
    this.playerForm = document.querySelector(".player-form");
    this.playerOneInput = document.querySelector("#player-one");
    this.playerTwoInput = document.querySelector("#player-two");
    this.gameController = gameController;
    this.uiController = uiController;
  }

  playerFormInit() {
    this.playerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this.gameController.playerOne.name = this.playerOneInput.value;
      this.gameController.playerTwo.name = this.playerTwoInput.value;

      this.uiController.shipSelector();
      this.uiController.handleCellClick();
      console.log("GO");
      this.menuContainer.classList.add("hidden");

      this.playerForm.reset();
    });
  }
}
