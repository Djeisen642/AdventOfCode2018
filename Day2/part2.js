const list = require('../modules/fileReader');

const arraysOfLetters = list.map((item) => item.split(''));

const lengthOfStrings = arraysOfLetters[0].length;

for (let i = 1; i < arraysOfLetters.length; i++) {
  const thisArrayOfLetters = arraysOfLetters[i];
  let indexOfDifference = -1;
  for (let j = 0; j < i; j++) {
    const otherArrayOfLetters = arraysOfLetters[j];
    for (let k = 0; k < lengthOfStrings; k++) {
      if (thisArrayOfLetters[k] !== otherArrayOfLetters[k]) {
        if (indexOfDifference === -1) {
          indexOfDifference = k;
        } else {
          indexOfDifference = -1;
          break;
        }
      }
    }
    if (indexOfDifference >= 0) {
      break;
    }
  }
  if (indexOfDifference >= 0) {
    thisArrayOfLetters.splice(indexOfDifference, 1);
    console.log(thisArrayOfLetters.join(''));
    break;
  }
}
