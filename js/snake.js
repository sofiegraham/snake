const helpers = require('./helpers.js');

class Snake {
  constructor(pos) {
    this.pos = pos;
    this.dir = "S";
    this.segments = [pos];
    this.generateStarterSegments();

  }

  move() {
    this.pos = helpers.nextPosition(this.pos,this.dir);
    if(this.growing !== true) {
      this.segments.pop();
    }
    this.growing = false;
    this.segments.unshift(this.pos);
  }

  turn(direction) {
    this.dir = direction;
  }

  grow() {
    this.growing = true;
  }

  generateStarterSegments() {
    while(this.segments.length < Snake.STARTLENGTH) {
      const segment = [this.pos[0]-1,this.pos[1]];
      this.segments.push(segment);
    }
  }


}

Snake.DIRECTIONS = ["N","E","S","W"];
Snake.STARTLENGTH = 3;

module.exports = Snake;
