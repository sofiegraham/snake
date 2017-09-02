const Snake = require('./snake.js');

class Board {
  constructor() {
    this.apples = [this.randomPosition()];
    this.grid = this.cleanGrid();
    this.snake = new Snake(this.spawnPoint());
  }

  spawnPoint() {
    const mid = Math.floor(this.grid.length/2);
    return [mid,mid];
  }

  randomPosition() {
    return [Math.floor(Math.random() * Board.SIZE), Math.floor(Math.random() * Board.SIZE)];
  }

  bumpCheck() {
    const snakeHead = this.snake.pos;
    this.appleBump(snakeHead);


    //check if snakehead is at apple position
    //if YES, removeApple, randomApple, growSnake
    //ELSE if snake head at snake position
    //--killSnake endGame
    //ELSE if snake head at wall position
    //--killSnake endGame
  }

  isOffGrid(pos) {
    return (pos[0] > Board.SIZE || pos[1] > Board.SIZE || pos[0] < 0 || pos[0] < 0);
  }

  appleBump(pos) {
    this.apples.forEach((arr, idx) => {
      if(arr[0] === pos[0] && arr[1] === pos[1]) {
        this.removeApple(idx);
        this.apples = [this.randomPosition()];
        this.snake.grow();
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
