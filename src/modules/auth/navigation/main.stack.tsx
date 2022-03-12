import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Code, Phone } from '../screens';
import { StackConfig, useDefaultScreenOptions } from '@/navigation';
import { useTranslation } from 'react-i18next';

export enum AuthMainScreen {
  PHONE = '[AUTH] PHONE',
  CODE = '[AUTH] CODE',
}

const { Navigator, Screen } = createNativeStackNavigator();

const AuthMainStack: FC = () => {
  const { t } = useTranslation(['navigation']);
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

      <Screen
        name={AuthMainScreen.CODE}
        component={Code}
        options={{
          headerBackTitle: t('back'),
        }}
      />
    </Navigator>
  );
};

export const AuthMainStackConfig: StackConfig = {
  parentOptions: {
    headerShown: false,
  },
  screens: [
    {
      name: '[STACKS] AUTH MAIN',
      children: Object.values(AuthMainScreen),
      component: AuthMainStack,
      options: {
        presentation: 'fullScreenModal',
      },
    },
  ],
};
