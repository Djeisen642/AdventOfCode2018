const {parsedData, biggestX, biggestY} = require('./parser');

const area = new Array(biggestY * biggestX).fill('.');

for (let i = 0; i < area.length; i++) {
  const x = i % biggestX;
  const y = Math.floor(i / biggestX);

  let closestDistance = Infinity;
  let closestIndex = -1;
  parsedData.forEach((datum, index) => {
    const distance = Math.abs(datum.x - x) + Math.abs(datum.y - y);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    } else if (distance === closestDistance) {
      closestIndex = -1;
    }
  });

  if (closestIndex === -1) {
    area[i] = '.';
  } else {
    area[i] = closestIndex;
  }
}

while (area.length) {
  const line = area.splice(0, biggestX);
  console.log(line.join(''));
}
