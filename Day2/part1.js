const list = require('../modules/fileReader');

let twos = 0;
let threes = 0;
for (const string of list) {
  const values = {};
  string.split('').forEach((letter) =>
    values[letter] = values[letter] ? (++values[letter]) : 1
  );
  const letters = Object.keys(values);
  twos += !!letters.find((letter) => values[letter] === 2);
  threes += !!letters.find((letter) => values[letter] === 3);
}

console.log(twos, threes, twos * threes);
