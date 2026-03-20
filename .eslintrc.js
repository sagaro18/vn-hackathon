module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    env: {
      node: true, 
      browser: true, 
      es2021: true,
    },
    ignorePatterns: ['node_modules/', 'dist/', '.expo/', 'web-build/'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'eqeqeq': 'error',
    },
  };