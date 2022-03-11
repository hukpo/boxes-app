import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Code, Phone } from '../../../screens';
import { useDefaultScreenOptions } from '@/navigation';

export enum AuthMainScreen {
  PHONE = '[AUTH] PHONE',
  CODE = '[AUTH] CODE',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthMainStack: FC = () => {
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator screenOptions={{ ...defaultScreenOptions, headerBlurEffect: undefined, gestureEnabled: false }}>
      <Screen
        name={AuthMainScreen.PHONE}
        component={Phone}
        options={{
          headerTitle: '',
          headerLeft: undefined,
          headerBackVisible: false,
        }}
      />

      <Screen name={AuthMainScreen.CODE} component={Code} />
    </Navigator>
  );
};
