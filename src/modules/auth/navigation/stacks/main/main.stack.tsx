import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../../../screens';

export enum AuthMainScreen {
  WELCOME = '[AUTH] WELCOME',
}

const { Navigator, Screen } = createStackNavigator();

export const AuthMainStack: FC = () => {
  return (
    <Navigator>
      <Screen
        name={AuthMainScreen.WELCOME}
        component={Welcome}
        options={{ gestureEnabled: false, headerLeft: () => null }}
      />
    </Navigator>
  );
};
