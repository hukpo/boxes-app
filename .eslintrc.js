module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
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
