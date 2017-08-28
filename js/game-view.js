const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindKeyListeners();
    setInterval(this.step.bind(this), 10);
  }

  bindKeyListeners() {
    $(document).on('keydown', this.changeDir);
  }

  changeDir(event) {
    const dir = event.key;
    if(View.KEYMAP[dir]) {
      this.board.snake.turn(dir);
    }
  }

  step() {
    //this.board.snake.move();
    this.draw();
  }

  draw() {
    this.$el.empty();
    this.$el.append('<table id="board" ></table>');
    this.board.grid.forEach((arr, aIdx) => {
      $('#board').append('<tr id="row' + aIdx + '"></tr>')
      arr.forEach((el, elIdx)=> {
        const newSquare = $('<td class="square" id="' + [aIdx,elIdx] + '"></td>');
        newSquare.addClass(el.filler);
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
