const {data, biggestX, biggestY} = require('./parseData');
const multiDimArray = [];
const largestIndex = biggestX * biggestY;
for (let i = 0; i < largestIndex; i++) {
  multiDimArray.push([]);
}
const switches = new Array(data.length).fill(false);

for (const datum of data) {
  for (let i = 0; i < datum.height; i++) {
    for (let j = 0; j < datum.width; j++) {
      const index = (datum.y + i) * biggestX + (datum.x + j);
      const spot = multiDimArray[index];
      spot.push(datum.id);
      if (spot.length > 1) {
        for (const id of spot) {
          switches[id-1] = true;
        }
      }
    }
  }
}

console.log(switches.indexOf(false) + 1);
