module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@db': './src/db',
          '@assets': './src/assets',
          '@config': './src/config',
          '@constants': './src/constants',
          '@components': './src/components',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@locales': './src/locales',
          '@models': './src/models',
          '@themes': './src/themes',
          '@modules': './src/modules',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@stores': './src/stores',
          '@ui-kit': './src/ui-kit',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
