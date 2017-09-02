const Snake = require('./snake.js');

class Board {
  constructor() {
    this.apples = [[0,0]];
    this.grid = this.cleanGrid();
    this.snake = new Snake(this.spawnPoint());
  }

  spawnPoint() {
    const mid = Math.floor(this.grid.length/2);
    return [mid,mid];
  }

  randomApple() {
    //places an apple randomly on the board
  }

  eatCheck() {
    //check if snakehead is at apple position
    //if YES, removeApple, randomApple, growSnake
  }

  cleanGrid() {
    return Array(Board.SIZE).fill("").map(function(el) {
      return Array(Board.SIZE).fill(undefined);
    });
  }
}

Board.SIZE = 25;

module.exports = Board;
