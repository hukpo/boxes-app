import 'reflect-metadata';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import { AppRegistry, LogBox } from 'react-native';
import { enableFreeze } from 'react-native-screens';

import './wdyr';
import './src/locales';
import { App } from './src/app.view';
import { name as appName } from './app.json';

// Bug with theme not switching immediately on previous screen
enableFreeze(false);

LogBox.ignoreLogs([
  /RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks/,
  /\[react-native-gesture-handler\] Seems like you/,
  /ViewPropTypes will be removed from React Native/,
  /Invalid prop `style` supplied to `React.Fragment`./,
]);

AppRegistry.registerComponent(appName, () => App);
