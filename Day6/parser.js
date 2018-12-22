const data = require('../modules/fileReader');

const parsedData = data.map((datum) => {
  const [, x, y] = datum.match(/(\d+), (\d+)/);
  return {
    x,
    y,
    area: 0,
  };
});

let biggestX = 0;
let biggestY = 0;
parsedData.forEach((currentDatum) => {
  biggestX = Math.max(biggestX, currentDatum.x);
  biggestY = Math.max(biggestY, currentDatum.y);
});

// Add 1 for good measure
biggestX = biggestX + 1;
biggestY = biggestY + 1;

module.exports = {
  parsedData,
  biggestX,
  biggestY,
};
