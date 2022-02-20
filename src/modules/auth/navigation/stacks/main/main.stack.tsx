import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Code, Phone } from '../../../screens';

export enum AuthMainScreen {
  PHONE = '[AUTH] PHONE',
  CODE = '[AUTH] CODE',
}

const { Navigator, Screen } = createStackNavigator();

export const AuthMainStack: FC = () => {
  return (
    <Navigator>
      <Screen
        name={AuthMainScreen.PHONE}
        component={Phone}
        options={{
          gestureEnabled: false,
          headerTransparent: true,
          headerTitle: () => null,
          headerLeft: () => null,
        }}
      />

      <Screen
        name={AuthMainScreen.CODE}
        component={Code}
        options={{
          gestureEnabled: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
    </Navigator>
  );
};
