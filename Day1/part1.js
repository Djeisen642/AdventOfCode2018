const list = require('../modules/fileReader');

let count = 0;
for (const item of list) {
  count += +item;
}

console.log(count);
