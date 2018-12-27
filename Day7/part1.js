const {firstSteps, steps} = require('./parser');

const choices = firstSteps;

let traversed = 0;
const numSteps = Object.keys(steps).length;
let stepString = '';

let currentStep = null;

while (traversed !== numSteps) {
  if (choices.length) {
    choices.sort();

    const currentIndex = choices.findIndex((choiceLetter) => {
      return steps[choiceLetter].previousSteps
          .every((previousStep) =>
            stepString.includes(previousStep.stepLetter)
          );
    });

    if (currentIndex > -1) {
      currentStep = choices[currentIndex];
      choices.splice(currentIndex, 1);
    }
  }
  traversed ++;
  console.log(currentStep, choices);
  stepString += currentStep;
  const nextSteps = steps[currentStep].nextSteps;
  if (nextSteps.length) {
    for (const nextStep of nextSteps) {
      if (!stepString.includes(nextStep.stepLetter) &&
        !choices.includes(nextStep.stepLetter)) {
        choices.push(nextStep.stepLetter);
      }
    }
  }
}

console.log(stepString);
