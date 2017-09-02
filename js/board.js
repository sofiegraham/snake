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
    //places an apple randomly on the board
    return [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];
  }

  bumpCheck() {
    //check if snakehead is at apple position
    //if YES, removeApple, randomApple, growSnake
    //ELSE if snake head at snake position
    //--killSnake endGame
    //ELSE if snake head at wall position
    //--killSnake endGame
  }

  cleanGrid() {
    return Array(Board.SIZE).fill("").map(function(el) {
      return Array(Board.SIZE).fill(undefined);
    });
  }
}

Board.SIZE = 25;

module.exports = Board;
