module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['@bothrs/eslint-config'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['global.d.ts', '.eslintrc.js', 'webpack.config.js'],
}
