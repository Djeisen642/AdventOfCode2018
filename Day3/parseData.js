const list = require('../modules/fileReader');

const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

const data = [];
let biggestX = 0;
let biggestY = 0;
for (const string of list) {
  let [, id, x, y, width, height] = string.match(regex);
  id = +id;
  x = +x;
  y = +y;
  width = +width;
  height = +height;
  biggestX = Math.max(biggestX, x+width);
  biggestY = Math.max(biggestY, y+height);
  data.push({
    id,
    x,
    y,
    width,
    height,
  });
}
module.exports = {
  data,
  biggestX,
  biggestY
};
