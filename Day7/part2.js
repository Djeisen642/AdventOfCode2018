const yargs = require('yargs')
    .demand(['n'])
    .number('n')
    .describe('n', 'Number of workers')
    .number('o')
    .default('o', 0)
    .describe('o', 'Base amount of time per step')
    .argv;

const Task = require('./task');

const {firstSteps, steps} = require('./parser');

const choices = firstSteps;

const traversed = new Set();
const numSteps = Object.keys(steps).length;
const workers = new Array(yargs.n).fill(null);
let currentTime = 0;

// Fill in all the step time lengths
for (const stepLetter in steps) {
  if (steps.hasOwnProperty(stepLetter)) {
    const step = steps[stepLetter];
    // Add 1 because A is not 0 time, it's 1
    const timeLength = yargs.o +
      step.stepLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    step.setTimeLength(timeLength);
  }
}


while (traversed.size !== numSteps) {
  let nextFinishTime = Infinity;
  let nextFinishedWorkerIndex = -1;
  workers.forEach((workingOn, index) => {
    if (workingOn) {
      if (workingOn.finishTime < nextFinishTime) {
        nextFinishTime = workingOn.finishTime;
        nextFinishedWorkerIndex = index;
      }
    }
  });
  if (nextFinishedWorkerIndex > -1) {
    const finishedWorker = workers[nextFinishedWorkerIndex];
    traversed.add(finishedWorker.step.stepLetter);
    currentTime = finishedWorker.finishTime;
    const nextSteps = finishedWorker.step.nextSteps;
    if (nextSteps.length) {
      for (const nextStep of nextSteps) {
        if (!traversed.has(nextStep.stepLetter) &&
          !choices.includes(nextStep.stepLetter)) {
          choices.push(nextStep.stepLetter);
        }
      }
    }
    workers[nextFinishedWorkerIndex] = null;
  }
  if (choices.length) {
    choices.sort();
    workers.forEach((workingOn, index) => {
      if (!workingOn) {
        const currentIndex = choices.findIndex((choiceLetter) => {
          return steps[choiceLetter].previousSteps
              .every((previousStep) =>
                traversed.has(previousStep.stepLetter)
              );
        });

        if (currentIndex > -1) {
          const stepToWorkOn = steps[choices[currentIndex]];
          const finishTime = currentTime + stepToWorkOn.timeLength;
          workers[index] = new Task(finishTime, stepToWorkOn);
          choices.splice(currentIndex, 1);
        }
      }
    });
  }
}

console.log(currentTime);
