const Board = require('./board.js');
const helpers = require('./helpers.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindKeyListeners();
    this.wait = false;
    this.animate = setInterval(this.step.bind(this), View.ANIMATE);
  }

  bindKeyListeners() {
    $(window).on('keydown', this.changeDir.bind(this));
  }

  changeDir(event) {
    const dir = event.key;
    if(View.KEYMAP[dir]) {
      this.throttle(this.board.snake.turn, View.ANIMATE/2)(View.KEYMAP[dir]);
    }
  }

  throttle(callback, limit) {
    return (stuff) => {
      if(!this.wait) {
        callback.call(this.board.snake, stuff);
        this.wait = true;
        setTimeout(() => {
          this.wait = false;
        }, limit);
      }
    }
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
    this.drawApples();
    this.drawGUI();
  }

  drawPieces(boardPiece, className) {
    boardPiece.forEach((arr, idx)=> {
      const target = `#${arr[0]}_${arr[1]}`;
      this.$el.find(target).css({"background": `linear-gradient(135deg, rgb(${View.COLORS[idx]}) 0%, rgb(${View.COLORS[idx + 1]}) 100%)`});
    });
  }

  drawApples() {
    this.board.apples.forEach((arr, idx)=> {
      const target = `#${arr[0]}_${arr[1]}`;
      this.$el.find(target).addClass('apple');
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
View.ANIMATE = 100;
View.KEYMAP = {
  w: "N",
  s: "S",
  d: "E",
  a: "W"
}

module.exports = View;
