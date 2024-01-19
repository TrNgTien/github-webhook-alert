module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    { files: ['**/*.cjs'], env: { node: true } },
    {
      files: ['*.ts', '*.d.ts', '*.js'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-debugger': 'off',
        'no-undef': 'off',
        'react-hooks/rules-of-hooks': 'warn',
        'react/jsx-boolean-value': 'error',
        'react/react-in-jsx-scope': 'off',
        semi: 'off',
        'no-shadow': 'off', // ignore warning enum
        '@typescript-eslint/no-shadow': 'warn',
      },
    },
  ],
};
