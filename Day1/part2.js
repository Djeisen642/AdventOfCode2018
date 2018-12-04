const list = require('../modules/fileReader');

let found = false;
const frequencies = new Set();
let curFrequency = 0;
let counter = 0;
while (found === false) {
  const item = list[counter];
  curFrequency += +item;
  if (frequencies.has(curFrequency)) {
    found = curFrequency;
  }
  frequencies.add(curFrequency);
  counter = ++counter % list.length;
}

console.log(found);
