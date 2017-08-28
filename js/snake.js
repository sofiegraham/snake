const Helpers = require('./helpers.js');

class Snake {
  constructor(pos) {
    this.pos = pos;
    this.dir = "S";
    this.segments = [pos];

  }

  move() {
    this.pos = Helpers.nextPosition(pos,dir);
  }

  turn(direction) {
    this.dir = direction;
  }


}

Snake.DIRECTIONS = ["N","E","S","W"];

module.exports = Snake;
