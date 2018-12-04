const fs = require('fs');
const yargs = require('yargs')
    .string('f')
    .describe('f', 'Load input file')
    .boolean('t')
    .describe('t', 'Trim input file')
    .boolean('s')
    .alias('s', 'split')
    .describe('s', 'Split by line')
    .argv;

const input = fs.readFileSync(yargs.f, 'utf-8');

let output = input;

if (yargs.t) {
  output = output.trim();
}

if (yargs.split) {
  output = output.split('\n');
}

module.exports = output;
