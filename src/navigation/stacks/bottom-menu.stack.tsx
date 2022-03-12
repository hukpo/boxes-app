import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackConfig } from '../types';
import { Background } from '@/navigation';
import { SettingsMainStackConfig, BoxesMainStackConfig } from '@/modules';

const { Navigator, Group, Screen } = createBottomTabNavigator();

const STACK_CONFIGS = [BoxesMainStackConfig, SettingsMainStackConfig];

const BottomMenuStack: FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => <Background />,
      }}>
      {STACK_CONFIGS.map((config, index) => (
        <Group key={index} screenOptions={config.parentOptions}>
          {config.screens.map(screen => (
            <Screen key={screen.name} name={screen.name} component={screen.component} options={screen.options} />
          ))}
        </Group>
      ))}
    </Navigator>
  );
};

export const BottomMenuStackConfig: StackConfig = {
  parentOptions: {
    headerShown: false,
  },
  screens: [
    {
      name: '[STACKS] BOTTOM MENU',
      component: BottomMenuStack,
    },
  ],
};
