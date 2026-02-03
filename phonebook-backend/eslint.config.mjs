import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },

  js.configs.recommended,
]