module.exports = {
  root: true,
  extends: ['@monorepo/eslint'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
