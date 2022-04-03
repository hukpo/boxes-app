import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Code, Phone } from '../screens';
import { STACKS, NC, useDefaultScreenOptions } from '@/navigation';

export enum AuthMainScreen {
  PHONE = '[AUTH] PHONE',
  CODE = '[AUTH] CODE',
}

const Stack = createNativeStackNavigator();

const AuthMainStack: FC = () => {
  const { t } = useTranslation(['navigation']);
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerBlurEffect: undefined,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name={AuthMainScreen.PHONE}
        component={Phone}
        options={{
          headerTitle: '',
          headerLeft: undefined,
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name={AuthMainScreen.CODE}
        component={Code}
        options={{
          headerBackTitle: t('back'),
        }}
      />
    </Stack.Navigator>
  );
};

export const AuthMainNavigation: NC = ({ Group, Screen }) => {
  return (
    <Group screenOptions={{ headerShown: false }}>
      <Screen
        name={STACKS.AuthMain.name}
        component={AuthMainStack}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Group>
  );
};
