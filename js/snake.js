const Helpers = require('./helpers.js');

class Snake {
  constructor(pos) {
    this.pos = pos;
    this.direction = "S";
    this.segments = [[0,0]];

  }


}

Snake.DIRECTIONS = ["N","E","S","W"];

module.exports = Snake;
