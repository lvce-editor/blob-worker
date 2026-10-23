import { defineConfig } from 'eslint/config'
import config, { recommendedActions } from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config,
  ...recommendedActions,
  {
    rules: {
      'jest/no-restricted-jest-methods': 'off',
      '@cspell/spellchecker': 'off',
    },
  },
  {
    // These tests run Playwright directly to exercise the built candidate worker.
    // page.evaluate callbacks execute in a browser, outside the Node test scope.
    files: ['packages/e2e/test/*.spec.ts'],
    rules: {
      'e2e/no-imports': 'off',
      'unicorn/isolated-functions': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
])
