import { Ship } from "./ship.js";

export class GameBoard {
  #board = Array.from({ length: 10 }, () => Array(10).fill(0));
  #ships = [];
  constructor() {
    this.placedShips = new Set();
    this.allShipsPlaced = false;
  }

  getValidPlace(isHorizontal, length, startRow, startCol) {
    if (isHorizontal) {
      if (startCol + length > 10) return false;

      for (let i = 0; i < length; i++) {
        if (this.#board[startRow][startCol + i] !== 0) {
          return false;
        }
      }
      return true;
    } else {
      if (startRow + length > 10) return false;

      for (let i = 0; i < length; i++) {
        if (this.#board[startRow + i][startCol] !== 0) {
          return false;
        }
      }
      return true;
    }
  }

  placeShip(isHorizontal, length, id, coordinates) {
    const [row, col] = coordinates.split(",").map(Number);
    if (this.getValidPlace(isHorizontal, length, row, col)) {
      if (isHorizontal) {
        const ship = new Ship(id, length);
        for (let i = 0; i < length; i++) {
          this.#board[row][col + i] = 1;
          ship.position.add(`${row},${col + i}`);
        }
        this.#ships.push(ship);
        this.placedShips.add(ship.id);
        console.log(this.#ships);
      } else {
        const ship = new Ship(id, length);
        for (let i = 0; i < length; i++) {
          this.#board[row + i][col] = 1;
          ship.position.add(`${row + i},${col}`);
        }
        this.#ships.push(ship);
        this.placedShips.add(ship.id);
        console.log(this.#ships);
      }

      if (this.#ships.length > 1) {
        console.log(this.#board);
        this.allShipsPlaced = true;
      }
    }
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates.split(",").map(Number);
    let hit = false;
    for (let i = 0; i < this.#ships.length; i++) {
      if (this.#ships[i].position.has(coordinates)) {
        this.#ships[i].hit();
        this.#board[row][col] = 2;
        hit = true;
        return hit;
      }
    }
    if (!hit) {
      this.#board[row][col] = 3;
      return hit;
    }
  }

  areAllShipsSunk() {
    for (let i = 0; i < this.#ships.length; i++) {
      if (!this.#ships[i].destroyed) {
        return false;
      }
    }
    return true;
  }
}
