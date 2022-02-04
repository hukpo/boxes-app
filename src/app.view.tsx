import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MainStack } from './navigation';
import { rootStore, RootStoreContext } from './stores';

export const App: FC = require('aws-amplify-react-native').withAuthenticator(
  () => {
    return (
      <GestureHandlerRootView style={styles.container}>
        <RootStoreContext.Provider value={rootStore}>
          <SafeAreaProvider>
            <MainStack />
          </SafeAreaProvider>
        </RootStoreContext.Provider>
      </GestureHandlerRootView>
    );
  },
  {
    usernameAttributes: 'email',
    signUpConfig: {
      hideAllDefaults: true,
      signUpFields: [
        {
          label: 'Email',
          key: 'username',
          required: true,
          displayOrder: 1,
          type: 'string',
          placeholder: 'Enter your email',
        },
        {
          label: 'Password',
          key: 'password',
          required: true,
          displayOrder: 2,
          type: 'password',
          placeholder: 'Enter your password',
        },
      ],
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
