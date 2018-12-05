const {data, biggestX, biggestY} = require('./parseData');
const multiDimArray = new Array(biggestX*biggestY).fill(0);

for (const datum of data) {
  for (let i = 0; i < datum.height; i++) {
    for (let j = 0; j < datum.width; j++) {
      const index = (datum.y + i) * biggestX + (datum.x + j);
      multiDimArray[index]++;
    }
  }
}

console.log(multiDimArray.filter((value) => value > 1).length);


