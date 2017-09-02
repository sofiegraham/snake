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
