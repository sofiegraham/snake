const Snake = require('./snake.js');

class Board {
  constructor() {
    this.apples = [[0,0]];
    this.grid = Array(Board.SIZE).fill("").map(function(el) {
      return Array(Board.SIZE).fill({filled: 'none'});
    });
    this.snake = new Snake(this.spawnPoint());
  }

  spawnPoint() {
    const mid = Math.floor(this.grid.length/2);
    return [mid,mid];
  }
}

Board.SIZE = 25;

module.exports = Board;
