import { GameBoard } from "./game-board.js";

const ships = document.querySelector(".my-ships");
const oponentShips = document.querySelector(".oponent-ships");

export class PlayerOne {
  constructor(gameController) {
    this.gameController = gameController;
    this.selectedShipLength;
    this.selectedShipId;
    this.allShipsPlaced = false;
    this.gameBoard = new GameBoard();
  }

  putShips() {
    const cellsContainer = document.querySelector(".grid");
    ships.addEventListener("click", (event) => {
      if (this.allShipsPlaced) return;

      let id = event.target.dataset.id;
      let length = event.target.dataset.length;

      if (!id || !length) return;

      this.selectedShipId = id;
      this.selectedShipLength = length;
    });

    cellsContainer.addEventListener("click", (event) => {
      const ship = this.gameBoard.ships.find(
        (el) => el.id === this.selectedShipId
      );

      if (!ship) {
        let cell = event.target.dataset.coordinate.split(",").map(Number);
        this.gameBoard.placeShip(
          this.selectedShipLength,
          this.selectedShipId,
          cell[0],
          cell[1]
        );

        if (this.gameBoard.ships.length === 5) {
          this.allShipsPlaced = true;
          console.log(this.gameBoard.ships);
          this.gameController.startOponent();
          return;
        }
      }
    });
  }

  attack() {
    const cellscontainer = document.querySelector(".oponent-grid");

    cellscontainer.addEventListener("click", (event) => {
      let cell = target.event.dataset.coordinate.split(",").map(Number);

      this.gameBoard.recieveAttack(cell);
    });
  }
}

export class PlayerTwo {
  constructor(gameController) {
    this.gameController = gameController;
    this.selectedShipLength;
    this.selectedShipId;
    this.allShipsPlaced = false;
    this.gameBoard = new GameBoard();
  }

  putShips() {
    const cellscontainer = document.querySelector(".oponent-grid");
    oponentShips.addEventListener("click", (event) => {
      if (this.allShipsPlaced) return;

      let id = event.target.dataset.id;
      let length = event.target.dataset.length;

      if (!id || !length) return;

      this.selectedShipId = id;
      this.selectedShipLength = length;
    });

    cellscontainer.addEventListener("click", (event) => {
      if (this.allShipsPlaced) return;
      const ship = this.gameBoard.ships.find(
        (el) => el.id === this.selectedShipId
      );

      if (!ship) {
        let cell = event.target.dataset.coordinate.split(",").map(Number);

        this.gameBoard.placeShip(
          this.selectedShipLength,
          this.selectedShipId,
          cell[0],
          cell[1]
        );

        if (this.gameBoard.ships.length === 5) {
          this.allShipsPlaced = true;
          console.log(this.gameBoard.ships);
        }
      }
    });
  }
}

export class GameController {
  constructor() {
    this.currentPlayer = null;
    this.playerOne = new PlayerOne(this);
    this.playerTwo = new PlayerTwo(this);
  }

  startGame() {
    this.playerOne.putShips();
  }

  startOponent() {
    console.log("OPONENT MOVE");
    this.playerTwo.putShips();
  }

  atackPhase() {
    this.currentPlayer.attack();
  }
}
