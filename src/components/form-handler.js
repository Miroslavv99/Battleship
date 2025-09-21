export class FormHandler {
  constructor(gameController, uiController) {
    this.menuContainer = document.querySelector(".menu");
    this.playerForm = document.querySelector(".player-form");
    this.playerOneInput = document.querySelector("#player-one");
    this.playerTwoInput = document.querySelector("#player-two");
    this.gameController = gameController;
    this.uiController = uiController;
    this.playerOneError = document.getElementById("player-one-error");
    this.playerTwoError = document.getElementById("player-two-error");
  }

  playerFormInit() {
    this.playerForm.addEventListener("input", () => {
      if (this.playerOneInput.validity.tooShort) {
        this.playerOneError.textContent = `Player name must contain 2 or more characters`;
      } else {
        this.playerOneError.textContent = "";
      }

      if (this.playerTwoInput.validity.tooShort) {
        this.playerTwoError.textContent = `Player name must contain 2 or more characters`;
      } else {
        this.playerTwoError.textContent = "";
      }
    });
    this.playerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this.gameController.playerOne.name = this.playerOneInput.value;
      this.gameController.playerTwo.name = this.playerTwoInput.value;

      this.uiController.shipSelector();
      this.uiController.handleCellClick();

      this.menuContainer.classList.toggle("showing");

      this.playerForm.reset();
    });
  }
}
