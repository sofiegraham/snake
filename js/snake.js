const helpers = require('./helpers.js');
const Board = require('./board.js');

class Snake {
  constructor(pos, board) {
    this.pos = pos;
    this.board = board;
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
    if(this.board.isOffGrid(this.pos)) {
      this.pos = this.wrappedPos(this.pos);
    }
    this.segments.unshift(this.pos);
  }

  wrappedPos(pos) {
    const newPos = pos;
    const size = this.board.size - 1;
    if(pos[0] < 0) {
      newPos[0] = size;
    } else if (pos[0] > size) {
      newPos[0] = 0;
    }
    if(pos[1] < 0) {
      newPos[1] = size;
    } else if (pos[1] > size) {
      newPos[1] = 0;
    }
    return newPos;
  }

  isValidDirection(newDir) {
    const curDir = this.dir;
    return ((curDir === "N" && newDir !== "S") ||
      (curDir === "S" && newDir !== "N") ||
      (curDir === "W" && newDir !== "E") ||
      (curDir === "E" && newDir !== "W"));
  }

  turn(direction) {
    if(this.isValidDirection(direction)) {
      this.dir = direction;
    }
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
