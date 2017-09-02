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

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.bindKeyListeners();
    setInterval(this.step.bind(this), 1000);
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
    this.drawBoard();
    this.drawPieces(this.board.snake.segments, 'snake-body');
    this.drawPieces(this.board.apples, 'apple');
  }

  drawPieces(boardPiece, className) {
    boardPiece.forEach((arr)=> {
      const target = `#${arr[0]}_${arr[1]}`;
      this.$el.find(target).addClass(className);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(4);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const helpers = __webpack_require__(5);

class Snake {
  constructor(pos) {
    this.pos = pos;
    this.dir = "S";
    this.segments = [pos];
    this.generateStarterSegments();

  }

  move() {
    this.pos = helpers.nextPosition(this.pos,this.dir);
    this.segments.pop();
    this.segments.unshift(this.pos);
  }

  turn(direction) {
    this.dir = direction;
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
  }
}

module.exports = helpers;


/***/ })
/******/ ]);