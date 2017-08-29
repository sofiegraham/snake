const helpers = require('./helpers.js');

class Snake {
  constructor(pos) {
    this.pos = pos;
    this.dir = "S";
    this.segments = [pos];

  }

  move() {
    this.pos = helpers.nextPosition(this.pos,this.dir);
    this.segments.pop();
    this.segments.unshift(this.pos);
  }

  turn(direction) {
    this.dir = direction;
  }


}

Snake.DIRECTIONS = ["N","E","S","W"];

module.exports = Snake;
