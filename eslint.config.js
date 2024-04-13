// @ts-check

import eslint from '@eslint/js'
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['.git', 'node_modules', 'dist', 'eslint.config.js', '.storybook'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  reactRecommended,
  reactJsxRuntime,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'sort-imports': ['error'],
    },
  },
)
