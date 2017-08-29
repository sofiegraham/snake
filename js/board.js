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

  // stateOfBoard() {
  //   this.grid = this.cleanGrid();
  //   this.mapItems(this.apples, 'apple');
  //   this.mapItems(this.snake.segments, 'snake-body');
  // }
  //
  // mapItems(arr, className) {
  //   arr.forEach((pos)=> {
  //     this.grid[pos[0]][pos[1]].state = className};
  //   });
  // }

  cleanGrid() {
    return Array(Board.SIZE).fill("").map(function(el) {
      return Array(Board.SIZE).fill(undefined);
    });
  }
}

Board.SIZE = 25;

module.exports = Board;
