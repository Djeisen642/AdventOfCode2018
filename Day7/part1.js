const lines = require('../modules/fileReader');

const regex = /Step (.).*step (.)/;

const data = lines.map((line) => {
  const datum = line.match(regex);
  return datum.slice(1, 3);
});

console.log(data);
