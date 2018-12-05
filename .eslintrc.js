module.exports = {
  extends: 'google',
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'no-undef': [
      'error'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};