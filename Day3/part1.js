const list = require('../modules/fileReader');

const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
for (const string of list) {
  const [, id, x, y, width, height] = string.match(regex);
  console.log(id, x, y, width, height);
}
