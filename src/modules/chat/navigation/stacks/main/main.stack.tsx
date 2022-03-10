import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Main } from '../../../screens';
import { HeaderButton, useDefaultScreenOptions } from '@/navigation';

export enum ChatMainScreen {
  MAIN = '[CHAT MAIN] MAIN',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const ChatMainStack: FC = () => {
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator initialRouteName={ChatMainScreen.MAIN} screenOptions={defaultScreenOptions}>
      <Screen
        name={ChatMainScreen.MAIN}
        component={Main}
        options={{
          headerLeft: () => <HeaderButton backIconVisible canGoBack />,
        }}
      />
    </Navigator>
  );
};
