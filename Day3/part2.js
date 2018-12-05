const {data, biggestX} = require('./parseData');

for (const datum of data) {
  datum.indices = [];
  for (let i = 0; i < datum.height; i++) {
    for (let j = 0; j < datum.width; j++) {
      const index = (datum.y+i)*biggestX+(datum.x+j);
      datum.indices.push(index);
    }
  }
}

const switches = new Array(data.length).fill(false);

for (let i = 1; i < data.length; i++) {
  const currentDatum = data[i];
  for (let j = 0; j < i; j++) {
    const otherDatum = data[j];
    const found = otherDatum.indices.find((value) =>
      currentDatum.indices.indexOf(value) !== -1
    );
    if (found) {
      console.log(i, j, found);
      switches[i] = true;
      switches[j] = true;
      break;
    }
  }
}
// THIS DOES NOT WORK
console.log(switches.filter((isOn) => !isOn).length);
