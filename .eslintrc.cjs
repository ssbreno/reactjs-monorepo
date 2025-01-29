module.exports = {
  root: true,
  extends: ['@monorepo/eslint'],
  ignorePatterns: ['**/dist/**', '**/node_modules/**', '**/*.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./packages/*/tsconfig.json', './apps/*/tsconfig.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  }
};
