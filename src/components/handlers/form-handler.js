export class FormHandler {
  constructor(playerManager) {
    this.playerManager = playerManager;
    this.menuContainer = document.querySelector(".menu");
    this.playerForm = document.querySelector(".player-form");
    this.playerOneInput = document.querySelector("#player-one");
    this.playerTwoInput = document.querySelector("#player-two");
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
      if (
        this.playerOneInput.validity.valueMissing ||
        this.playerOneInput.validity.tooShort ||
        this.playerTwoInput.validity.valueMissing ||
        this.playerTwoInput.validity.tooShort
      ) {
        return;
      }

      this.playerManager.playerOne.name = this.playerOneInput.value;
      this.playerManager.playerTwo.name = this.playerTwoInput.value;

      this.menuContainer.classList.toggle("showing");
      this.playerForm.classList.toggle("showing");

      this.playerForm.reset();
    });
  }
}
