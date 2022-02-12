import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Email } from '../../../screens';

export enum AuthMainScreen {
  EMAIL = '[AUTH] EMAIL',
}

const { Navigator, Screen } = createStackNavigator();

export const AuthMainStack: FC = () => {
  return (
    <Navigator>
      <Screen
        name={AuthMainScreen.EMAIL}
        component={Email}
        options={{ gestureEnabled: false, headerLeft: () => null }}
      />
    </Navigator>
  );
};
