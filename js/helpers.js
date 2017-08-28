class Helpers {

  nextPosition(currentPos, direction) {
    const dir = Helpers.DIRECTIONS[direction];
    return [currentPos[0] + dir[0], currentPos[1] + dir[1]];
  }



}

Helpers.DIRECTIONS = {
  N: [-1,0],
  S: [1,0],
  E: [0,1],
  W: [0,-1]
}

module.exports = Helpers;
