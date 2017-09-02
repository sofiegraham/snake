const Snake = require('./snake.js');

class Board {
  constructor() {
    this.grid = this.cleanGrid();
    this.snake = new Snake(this.spawnPoint(), this);
    this.apples = [];
    this.addApples();
    this.size = Board.SIZE;
    this.score = 0;
  }

  spawnPoint() {
    const mid = Math.floor(this.grid.length/2);
    return [mid,mid];
  }

  randomPosition() {
    return [Math.floor(Math.random() * Board.SIZE), Math.floor(Math.random() * Board.SIZE)];
  }

  addApples() {
    this.apples = [this.randomUnusedPosition(), this.randomUnusedPosition()];
  }

  randomUnusedPosition() {
    const position = this.randomPosition();
    const used = this.apples.concat(this.snake.segments);
    var isValid = true;
    used.forEach((arr) => {
      if(arr[0] === position[0] && arr[1] === position[1]) {
        isValid = false;
      }
    })
    return isValid ? position : this.randomUnusedPosition();
  }

  bumpCheck() {
    const snakeHead = this.snake.pos;
    this.appleBump(snakeHead);
  }

  isOffGrid(pos) {
    return (pos[0] > Board.SIZE || pos[1] > Board.SIZE || pos[0] < 0 || pos[1] < 0);
  }

  deathCheck() {
    const pos = this.snake.pos;
    var death = false;
    this.snake.segments.forEach((arr, idx) => {
      if(idx > 0) {
        if(arr[0] === pos[0] && arr[1] === pos[1]) {
          death = true;
        }
      }
    })
    return death;
  }

  appleBump(pos) {
    this.apples.forEach((arr, idx) => {
      if(arr[0] === pos[0] && arr[1] === pos[1]) {
        this.removeApple(idx);
        this.apples.push(this.randomPosition());
        this.snake.grow();
        this.score ++;
      }
    })
  }

  removeApple(idx) {
    this.apples = this.apples.filter((el, eIdx) => {
      return idx !== eIdx;
    });
  }

  cleanGrid() {
    return Array(Board.SIZE).fill("").map(function(el) {
      return Array(Board.SIZE).fill(undefined);
    });
  }
}

Board.SIZE = 25;

module.exports = Board;
