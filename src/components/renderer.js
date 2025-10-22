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

  renderBattleInfo(info) {
    this.dashboard.textContent = info;
  }

  colorTheCell(cell, info) {
    cell.classList.add("color");
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

  markCell(cell, selector) {
    let myCell = document.getElementById(cell);
    myCell.classList.add(selector);
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
