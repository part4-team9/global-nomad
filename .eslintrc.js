module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    './eslint/react.js',
    './eslint/typescript.js',
    './eslint/import.js',
    './eslint/prettier.js',
    './eslint/next.js',
    './eslint/custom-rules.js',
    './eslint/tailwindcss.js',
  ],
  plugins: [],
  rules: { 'import/no-extraneous-dependencies': 0 },
};
