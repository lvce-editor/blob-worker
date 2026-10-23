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
])
