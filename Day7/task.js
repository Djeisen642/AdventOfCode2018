/**
 * Thing a worker works on
 */
module.exports = class Task {
  /**
   * @param {number} finishTime time at which the task is finished
   * @param {Step} step step to be worked on
   */
  constructor(finishTime, step) {
    this.finishTime = finishTime;
    this.step = step;
  }
};
