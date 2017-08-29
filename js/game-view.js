const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindKeyListeners();
    setInterval(this.step.bind(this), 1000);
  }

  bindKeyListeners() {
    $(document).on('keydown', this.changeDir(event));
  }

  changeDir(event) {
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
      const segmentPos = JSON.stringify(arr);
      this.$el.find('#' + segmentPos).addClass('apple');
      $('#' + segmentPos).removeClass('empty');
    });
  }

  drawBoard() {
    this.$el.empty();
    this.$el.append('<table id="board" ></table>');
    this.board.grid.forEach((arr, aIdx) => {
      $('#board').append('<tr id="row' + aIdx + '"></tr>')
      arr.forEach((el, elIdx)=> {
        const newSquare = $('<td class="square empty" id="' + JSON.stringify([aIdx,elIdx]) + '"></td>');
        newSquare.data("pos", [aIdx,elIdx]);
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
