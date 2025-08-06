export class Ship {
  constructor(shipLength) {
    this.shipLength = shipLength;
    this.hits = 0;
    this.destroyed = false;
    this.position = new Set();
  }

  hit() {
    if (this.hits < this.shipLength) {
      this.hits += 1;
      this.isSunk();
    }
  }

  isSunk() {
    if (this.hits === this.shipLength) {
      this.destroyed = true;
    }
  }
}
