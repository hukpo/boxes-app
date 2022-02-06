import mockRNLocalize from 'react-native-localize/mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

global.__reanimatedWorkletInit = jest.fn();

require('react-native-gesture-handler/jestSetup');
require('react-native-reanimated/lib/src/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-localize', () => mockRNLocalize);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('mobx-react-lite', () => {});
