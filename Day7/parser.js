const lines = require('../modules/fileReader');
const Step = require('./step');

const regex = /Step (.).*step (.)/;

const data = lines.map((line) => {
  const datum = line.match(regex);
  return datum.slice(1, 3);
});

const steps = {};

for (const datum of data) {
  const [before, after] = datum;
  if (!steps[before]) {
    steps[before] = new Step(before);
  }

  if (!steps[after]) {
    steps[after] = new Step(after);
  }

  Step.addConnection(steps[before], steps[after]);
}

const firstSteps = [];

for (const stepLetter in steps) {
  if (steps.hasOwnProperty(stepLetter)) {
    steps[stepLetter].sortSteps();
    if (!steps[stepLetter].previousSteps.length) {
      firstSteps.push(stepLetter);
    }
  }
}

module.exports = {
  firstSteps,
  steps,
  data,
};
