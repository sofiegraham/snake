/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(2);

$(document).ready(function() {
  const $el = $('.snake');
  const view = new View($el);
});


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);
const helpers = __webpack_require__(5);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(4);

class Board {
  constructor() {
    this.grid = this.cleanGrid();
    this.snake = new Snake(this.spawnPoint(), this);
    this.apples = [];
    this.addApples();
    this.size = Board.SIZE;
    this.score = 0;
  }

  spawnPoint() {
    const mid = Math.floor(this.grid.length/2);
    return [mid,mid];
  }

  randomPosition() {
    return [Math.floor(Math.random() * Board.SIZE), Math.floor(Math.random() * Board.SIZE)];
  }

  addApples() {
    this.apples = [this.randomUnusedPosition(), this.randomUnusedPosition()];
  }

  randomUnusedPosition() {
    const position = this.randomPosition();
    const used = this.apples.concat(this.snake.segments);
    var isValid = true;
    used.forEach((arr) => {
      if(arr[0] === position[0] && arr[1] === position[1]) {
        isValid = false;
      }
    })
    return isValid ? position : this.randomUnusedPosition();
  }

  bumpCheck() {
    const snakeHead = this.snake.pos;
    this.appleBump(snakeHead);
  }

  isOffGrid(pos) {
    return (pos[0] > Board.SIZE || pos[1] > Board.SIZE || pos[0] < 0 || pos[1] < 0);
  }

  deathCheck() {
    const pos = this.snake.pos;
    var death = false;
    this.snake.segments.forEach((arr, idx) => {
      if(idx > 0) {
        if(arr[0] === pos[0] && arr[1] === pos[1]) {
          death = true;
        }
      }
    })
    return death;
  }

  appleBump(pos) {
    this.apples.forEach((arr, idx) => {
      if(arr[0] === pos[0] && arr[1] === pos[1]) {
        this.removeApple(idx);
        this.apples.push(this.randomPosition());
        this.snake.grow();
        this.score ++;
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const helpers = __webpack_require__(5);
const Board = __webpack_require__(3);

class Snake {
  constructor(pos, board) {
    this.pos = pos;
    this.board = board;
    this.dir = "S";
    this.segments = [pos];
    this.generateStarterSegments();

  }

  move() {
    this.pos = helpers.nextPosition(this.pos,this.dir);
    if(this.growing !== true) {
      this.segments.pop();
    }
    this.growing = false;
    if(this.board.isOffGrid(this.pos)) {
      this.pos = this.wrappedPos(this.pos);
    }
    this.segments.unshift(this.pos);
  }

  wrappedPos(pos) {
    const newPos = pos;
    const size = this.board.size - 1;
    if(pos[0] < 0) {
      newPos[0] = size;
    } else if (pos[0] > size) {
      newPos[0] = 0;
    }
    if(pos[1] < 0) {
      newPos[1] = size;
    } else if (pos[1] > size) {
      newPos[1] = 0;
    }
    return newPos;
  }

  isValidDirection(newDir) {
    const curDir = this.dir;
    return ((curDir === "N" && newDir !== "S") ||
      (curDir === "S" && newDir !== "N") ||
      (curDir === "W" && newDir !== "E") ||
      (curDir === "E" && newDir !== "W"));
  }

  turn(direction) {
    if(this.isValidDirection(direction)) {
      this.dir = direction;
    }
  }

  grow() {
    this.growing = true;
  }

  generateStarterSegments() {
    while(this.segments.length < Snake.STARTLENGTH) {
      const segment = [this.pos[0]-1,this.pos[1]];
      this.segments.push(segment);
    }
  }


}

Snake.DIRECTIONS = ["N","E","S","W"];
Snake.STARTLENGTH = 3;

module.exports = Snake;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const helpers = {

  nextPosition: function(currentPos, direction) {
    const dir = helpers.DIRECTIONS[direction];
    return [currentPos[0] + dir[0], currentPos[1] + dir[1]];
  },

  DIRECTIONS: {
    N: [-1,0],
    S: [1,0],
    E: [0,1],
    W: [0,-1]
  },

  generateColorStops: function(colArr1, colArr2) {
    const steps = helpers.STEPS;
    var rStop = colArr1[0];
    var gStop = colArr1[1];
    var bStop = colArr1[2];
    const red = Math.floor((rStop - colArr2[0]) /steps);
    const green = Math.floor((gStop - colArr2[1]) /steps);
    const blue = Math.floor((bStop - colArr2[2]) /steps);
    const colors = [];
    for(var i = 0; i < steps; i++) {
      colors.push(`${rStop},${gStop},${bStop}`);
      rStop -= red;
      gStop -= green;
      bStop -= blue;
    }
    return colors;
  },

  generateColors: function(){
    const rainbow = helpers.generateColorStops(helpers.PINK, helpers.YELLOW).concat
    (helpers.generateColorStops(helpers.YELLOW, helpers.BLUE)).concat
    (helpers.generateColorStops(helpers.BLUE, helpers.PURPLE)).concat
    (helpers.generateColorStops(helpers.PURPLE, helpers.PINK));
    return rainbow.concat(rainbow).concat(rainbow).concat(rainbow);
  },

  PINK: [255,187,230],
  YELLOW: [241, 244, 167],
  BLUE: [94, 178, 221],
  PURPLE: [144,88,179],

  STEPS: 5
}

module.exports = helpers;


/***/ })
/******/ ]);