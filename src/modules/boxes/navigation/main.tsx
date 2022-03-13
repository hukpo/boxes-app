import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from '@/ui-kit';
import { List } from '../screens';
import { STACKS, BNC, useDefaultScreenOptions } from '@/navigation';

export enum BoxesMainScreen {
  LIST = '[BOXES MAIN] LIST',
}

const Stack = createNativeStackNavigator();

const BoxesMainStack: FC = () => {
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Stack.Navigator initialRouteName={BoxesMainScreen.LIST} screenOptions={defaultScreenOptions}>
      <Stack.Screen name={BoxesMainScreen.LIST} component={List} />
    </Stack.Navigator>
  );
};

export const BoxesMainNavigation: BNC = ({ Group, Screen }) => {
  const { t } = useTranslation(['boxes']);

  return (
    <Group
      screenOptions={{
        tabBarLabel: t('boxes'),
        tabBarIcon: ({ color, size }) => <Icon name="box" size={size} color={color} />,
      }}>
      <Screen name={STACKS.BoxesMain.name} component={BoxesMainStack} />
    </Group>
  );
};
