const data = require('../modules/fileReader');

const ASCII_CODES= {
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

console.log(changedData.length);
