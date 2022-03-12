import { t } from 'i18next';
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from '@/ui-kit';
import { List } from '../screens';
import { BottomTabConfig, useDefaultScreenOptions } from '@/navigation';

export enum BoxesMainScreen {
  LIST = '[BOXES MAIN] LIST',
}

const { Navigator, Screen } = createNativeStackNavigator();

const BoxesMainStack: FC = () => {
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator initialRouteName={BoxesMainScreen.LIST} screenOptions={defaultScreenOptions}>
      <Screen name={BoxesMainScreen.LIST} component={List} />
    </Navigator>
  );
};

export const BoxesMainStackConfig: BottomTabConfig = {
  parentOptions: {
    tabBarLabel: t('boxes:boxes'),
    tabBarIcon: ({ color, size }) => <Icon name="box" size={size} color={color} />,
  },
  screens: [
    {
      name: '[STACKS] BOXES MAIN',
      children: Object.values(BoxesMainScreen),
      component: BoxesMainStack,
    },
  ],
};
