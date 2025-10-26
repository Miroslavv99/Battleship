export class GameUiRenderer {
  constructor() {
    this.dashboard = document.querySelector(".dashboard");
    this.orientationButton = document.querySelector(".orientation");
    this.playerOneGrid = document.querySelector(".grid-one");
    this.playerTwoGrid = document.querySelector(".grid-two");
  }

  renderGrid() {
    this.playerOneGrid.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.dataset.coordinate = `${i},${j}`;
        cell.id = `p1-${i},${j}`;
        cell.dataset.owner = "p1";
        cell.classList.add("cell");
        this.playerOneGrid.appendChild(cell);
      }
    }
  }

  renderOponentGrid() {
    this.playerTwoGrid.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.dataset.coordinate = `${i},${j}`;
        cell.id = `p2-${i},${j}`;
        cell.dataset.owner = "p2";
        cell.classList.add("cell");
        this.playerTwoGrid.appendChild(cell);
      }
    }
  }

  renderPlacementInfo(playerName, mode) {
    if (mode === "attack") {
      this.dashboard.textContent = `Player ${playerName} attack!`;
    } else {
      this.dashboard.textContent = `Player ${playerName} Put Your Ships!`;
    }
  }

  renderBattleInfo(attackInfo, currentPlayer, cell, winner) {
    if (winner) {
      this.dashboard.textContent = `Player ${currentPlayer} Win!`;
      document.getElementById(cell).classList.add("hit");
    } else {
      if (attackInfo) {
        document.getElementById(cell).classList.add("hit");
        this.dashboard.textContent = `Hit! Player ${currentPlayer} attack again!`;
      } else {
        document.getElementById(cell).classList.add("miss");
        this.dashboard.textContent = `Miss! Player ${currentPlayer} attack!`;
      }
    }
  }

  hidePlayerOneBoard() {
    this.playerOneGrid.classList.remove("showing");
  }

  hidePlayerTwoBoard() {
    this.playerTwoGrid.classList.remove("showing");
  }

  showPlayerOneBoard() {
    this.playerOneGrid.classList.add("showing");
  }

  showPlayerTwoBoard() {
    this.playerTwoGrid.classList.add("showing");
  }

  togglePlayerOneBoard() {
    this.playerOneGrid.classList.toggle("showing");
  }

  togglePlayerTwoBoard() {
    this.playerTwoGrid.classList.toggle("showing");
  }
  updateOrientationButton(isHorizontal) {
    if (isHorizontal) {
      this.orientationButton.textContent = "Horizontal";
    } else {
      this.orientationButton.textContent = "Vertical";
    }
  }

  markShipCells(coordinates, length, isHorizontal, player) {
    const [row, col] = coordinates.split(",").map(Number);

    for (let i = 0; i < length; i++) {
      if (player === "p1") {
        if (isHorizontal) {
          let cell = document.getElementById(`p1-${row},${col + i}`);
          cell.classList.add("ship-cell");
        } else {
          let cell = document.getElementById(`p1-${row + i},${col}`);
          cell.classList.add("ship-cell");
        }
      } else {
        if (isHorizontal) {
          let cell = document.getElementById(`p2-${row},${col + i}`);
          cell.classList.add("ship-cell");
        } else {
          let cell = document.getElementById(`p2-${row + i},${col}`);
          cell.classList.add("ship-cell");
        }
      }
    }
  }

  clearCells() {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("ship-cell");
    });
  }
}
