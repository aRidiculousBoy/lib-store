module.exports = {
  root: true,
  rules: {
    'prettier/prettier': 'off'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: ['standard', 'plugin:vue/recommended']
}
