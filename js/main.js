const View = require('./game-view.js');

$(document).ready(function() {
  const $el = $('.snake');
  const view = new View($el);
});
