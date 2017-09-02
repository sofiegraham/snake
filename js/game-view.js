const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindKeyListeners();
    setInterval(this.step.bind(this), 1000);
  }

  bindKeyListeners() {
    $(window).on('keydown', (event) => {
      console.log(event);
      const dir = event.key;
      if(View.KEYMAP[dir]) {
        this.board.snake.turn(View.KEYMAP[dir]);
      }
    });
  }

  changeDir(event) {
    console.log(event);
    const dir = event.key;
    if(View.KEYMAP[dir]) {
      this.board.snake.turn(dir);
    }
  }

  step() {
    this.board.snake.move();
    this.drawBoard();
    this.drawSnake();
  }

  drawSnake() {
    this.board.snake.segments.forEach((arr)=> {
      const target = `#${arr[0]}_${arr[1]}`;
      this.$el.find(target).addClass('snake-body');
    });
  }

  drawBoard() {
    this.$el.empty();
    this.$el.append('<table id="board" ></table>');
    this.board.grid.forEach((arr, aIdx) => {
      $('#board').append('<tr id="row' + aIdx + '"></tr>')
      arr.forEach((el, elIdx)=> {
        const newSquare = $(`<td class="square empty" id="${aIdx}_${elIdx}"></td>`);
        $('#row' + aIdx).append(newSquare);
      })
    });
  }

}

View.KEYMAP = {
  w: "N",
  s: "S",
  d: "E",
  a: "W"
}

module.exports = View;
