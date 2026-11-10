import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['public/theme/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.codegraph/**', 'public/lessons/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**/*.mjs', 'scripts/**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['tests/**/*.ts', 'vitest.config.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  }
);
