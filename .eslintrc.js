module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: 'useNavigationOptions',
      },
    ],
  },
};
