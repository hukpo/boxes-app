import 'reflect-metadata';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import Amplify from 'aws-amplify';
import { Storage } from '@aws-amplify/storage';
import { AppRegistry, LogBox } from 'react-native';
import { enableFreeze } from 'react-native-screens';

import './wdyr';
import './src/locales';
import { App } from './src/app.view';
import awsconfig from './src/aws-exports';
import { name as appName } from './app.json';

Storage.configure({ level: 'private' });
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

enableFreeze(true);

LogBox.ignoreLogs([
  /RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks/,
  /\[react-native-gesture-handler\] Seems like you/,
  /ViewPropTypes will be removed from React Native/,
]);

AppRegistry.registerComponent(appName, () => App);
