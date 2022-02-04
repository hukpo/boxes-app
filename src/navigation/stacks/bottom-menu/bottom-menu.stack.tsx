import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '@ui-kit';
import { STACKS } from '../../constants';
import { Background } from '@navigation';
import { SettingsMainStack, BoxesMainStack } from '@modules';

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomMenuStack: FC = () => {
  const { t } = useTranslation();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => <Background />,
      }}
    >
      <Screen
        name={STACKS.BoxesMain.name}
        component={BoxesMainStack}
        options={{
          tabBarLabel: t('boxes', { ns: 'boxes' }),
          tabBarIcon: ({ color, size }) => <Icon name="box" size={size} color={color} />,
        }}
      />
      <Screen
        name={STACKS.Settings.name}
        component={SettingsMainStack}
        options={{
          tabBarLabel: t('settings', { ns: 'settings' }),
          tabBarIcon: ({ color, size }) => <Icon name="gear" size={size} color={color} />,
        }}
      />
    </Navigator>
  );
};
