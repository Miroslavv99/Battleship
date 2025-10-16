export class Ship {
  constructor(id, shipLength) {
    this.id = id;
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
