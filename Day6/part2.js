const {parsedData, biggestX, biggestY} = require('./parser');
const yargs = require('yargs')
    .string('d')
    .describe('d', 'Maximum distance')
    .argv;

let numMatching = 0;

for (let i = 0; i < biggestX * biggestY; i++) {
  const x = i % biggestX;
  const y = Math.floor(i / biggestX);

  const totalDistance = parsedData.reduce((total, datum) => {
    return total + Math.abs(datum.x - x) + Math.abs(datum.y - y);
  }, 0);

  if (totalDistance < yargs.d) {
    numMatching ++;
  }
}

console.log(numMatching);
