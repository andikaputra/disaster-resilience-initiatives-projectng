module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'warn',
    'max-len': 'off',
    'react/react-in-jsx-scope': 'off',
    "linebreak-style": 0,
    'import/extensions': 'off',
    "react/jsx-key": "error",
    "no-use-before-define": "off",
    "no-duplicate-imports": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/prop-types": "off",
    "jsx-a11y/alt-text": "off"
  },
};
