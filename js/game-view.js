const Board = require('./board.js');
const helpers = require('./helpers.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindKeyListeners();
    this.animate = setInterval(this.step.bind(this), 100);
  }

  bindKeyListeners() {
    $(window).on('keydown', (event) => {
      const dir = event.key;
      if(View.KEYMAP[dir]) {
        this.board.snake.turn(View.KEYMAP[dir]);
      }
    });
  }

  step() {
    this.board.snake.move();
    this.board.bumpCheck();
    if(this.board.deathCheck()) {
      alert("DEATH!");
      clearInterval(this.animate);
    }
    this.drawBoard();
    this.drawPieces(this.board.snake.segments, 'snake-body');
    this.drawPieces(this.board.apples, 'apple');
    this.drawGUI();
  }

  drawPieces(boardPiece, className) {
    boardPiece.forEach((arr, idx)=> {
      console.log(View.COLORS[idx], View.COLORS[idx + 1]);
      const target = `#${arr[0]}_${arr[1]}`;
      this.$el.find(target).css({"background": `linear-gradient(135deg, rgb(${View.COLORS[idx]}) 0%, rgb(${View.COLORS[idx + 1]}) 100%)`});
    });
  }

  /*
  calc the amount of stops
  for each stop, increment the gradient
  save as 'style'

  rgb(30,87,153) 0%, rgb(51,8,49) 100%

  */



  drawGUI() {
    this.$el.find(`#board`).after(`<div class="score">Score: ${this.board.score}</div>`);
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

View.COLORS = helpers.generateColors();

View.KEYMAP = {
  w: "N",
  s: "S",
  d: "E",
  a: "W"
}

module.exports = View;
