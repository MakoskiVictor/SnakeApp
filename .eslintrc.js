module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  overrides: [
    { files: ['*.ts', '*.tsx']}
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react', 'react-hooks', '@typescript-eslint'
  ],
  "ignorePatterns": ["*.js"],
  rules: {
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
