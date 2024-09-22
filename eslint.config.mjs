import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginJest from 'eslint-plugin-jest'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['lib/', 'dist/', 'node_modules/', 'coverage/']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node
      },
      parserOptions: {
        project: '.github/linters/tsconfig.json'
      }
    }
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    files: ['__test__/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    ...eslintPluginJest.configs['flat/recommended']
  },
  eslintConfigPrettier
)
