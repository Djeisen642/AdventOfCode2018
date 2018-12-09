const data = require('../modules/fileReader');

const ASCII_CODES = {
  a: 65,
  A: 97,
};

const regexArray = [];
for (let i = 0; i < 26; i++) {
  const first = String.fromCharCode(ASCII_CODES.a + i, ASCII_CODES.A + i);
  const second = String.fromCharCode(ASCII_CODES.A + i, ASCII_CODES.a + i);
  regexArray.push(first, second);
}

const regex = new RegExp(regexArray.join('|'));

let changedData = data;

while (regex.test(changedData)) {
  changedData = changedData.replace(regex, '');
}

let shortestStringLength = Infinity;

for (let i = 0; i < 26; i++) {
  const polymerString = data
      .split('')
      .filter((letter) =>
        ![
          String.fromCharCode(ASCII_CODES.a + i),
          String.fromCharCode(ASCII_CODES.A + i),
        ].includes(letter)
      )
      .join('');

  let changedData = polymerString;
  while (regex.test(changedData)) {
    changedData = changedData.replace(regex, '');
  }

  shortestStringLength = Math.min(shortestStringLength, changedData.length);
}

console.log(shortestStringLength);
