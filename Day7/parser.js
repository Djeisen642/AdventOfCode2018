const lines = require('../modules/fileReader');

const regex = /Step (.).*step (.)/;

const data = lines.map((line) => {
  const datum = line.match(regex);
  return datum.slice(1, 3);
});

/**
 * Step object
 */
class Step {
  /**
   * Constructs a Step object
   * @param {String} stepLetter the letter of the step
   */
  constructor(stepLetter) {
    this.stepLetter = stepLetter;
    this.nextSteps = [];
    this.previousSteps = [];
  }

  /**
   * Adds a next step
   * @param {Step} step
   */
  addNextStep(step) {
    this.nextSteps.push(step);
  }

  /**
   * Adds a previous step
   * @param {Step} step
   */
  addPreviousStep(step) {
    this.previousSteps.push(step);
  }

  /**
   * Sorts both nextSteps and previousSteps
   */
  sortSteps() {
    this.nextSteps.sort(Step.sortingFunction);
    this.previousSteps.sort(Step.sortingFunction);
  }

  /**
   * helps with comparing steps
   * @param {Step} a
   * @param {Step} b
   * @return {number} diff
   */
  static sortingFunction(a, b) {
    return a.stepLetter - b.stepLetter;
  }

  /**
   * add next and previous steps to before and after step
   * @param {Step} beforeStep step item before
   * @param {Step} afterStep step item after
   */
  static addConnection(beforeStep, afterStep) {
    beforeStep.addNextStep(afterStep);
    afterStep.addPreviousStep(beforeStep);
  }
}

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
