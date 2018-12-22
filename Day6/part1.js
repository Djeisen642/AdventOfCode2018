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
    parsedData[closestIndex].area ++;
    area[i] = closestIndex;
  }
}

const border = new Set();

// TOP and BOTTOM
for (let i = 0; i < biggestX; i++) {
  border.add(area[i]);
  border.add(area[(biggestY-1) * biggestX + i]);
}

// SIDES
for (let i = 0; i < biggestY; i++) {
  border.add(area[i*biggestX]);
  border.add(area[(i+1)*biggestX-1]);
}

let greatestArea = 0;

for (let i = 0; i < parsedData.length; i++) {
  if (!border.has(i)) {
    greatestArea = Math.max(greatestArea, parsedData[i].area);
  }
}

console.log(greatestArea);
