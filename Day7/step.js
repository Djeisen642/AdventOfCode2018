/**
 * Step object
 */
module.exports = class Step {
  /**
   * Constructs a Step object
   * @param {String} stepLetter the letter of the step
   */
  constructor(stepLetter) {
    this.stepLetter = stepLetter;
    this.timeLength = 0;
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
   * Set length of time to complete step
   * @param {number} timeLength
   */
  setTimeLength(timeLength) {
    this.timeLength = timeLength;
  }

  /**
   * helps with comparing steps
   * @param {Step} a
   * @param {Step} b
   * @return {number} diff
   */
  static sortingFunction(a, b) {
    return a.stepLetter.localeCompare(b.stepLetter);
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
};
