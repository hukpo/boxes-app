import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NC } from '../types';
import { STACKS } from '../constants';
import { Background } from '@/navigation';
import { BoxesMainNavigation, SettingsMainNavigation } from '@/modules';

const Stack = createBottomTabNavigator();

const BottomMenuStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => <Background />,
      }}>
      {BoxesMainNavigation(Stack)}
      {SettingsMainNavigation(Stack)}
    </Stack.Navigator>
  );
};

export const BottomMenuNavigation: NC = ({ Group, Screen }) => {
  return (
    <Group screenOptions={{ headerShown: false }}>
      <Screen name={STACKS.BottomMenu.name} component={BottomMenuStack} />
    </Group>
  );
};
