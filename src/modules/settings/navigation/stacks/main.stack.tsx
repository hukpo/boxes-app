import { t } from 'i18next';
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from '@/ui-kit';
import { BottomTabConfig, useDefaultScreenOptions } from '@/navigation';
import { Appearance, AppearanceAutoNightMode, Language, List } from '../../screens';

export enum SettingsMainScreen {
  LIST = '[SETTINGS] LIST',
  APPEARANCE = '[SETTINGS] APPEARANCE',
  APPEARANCE_AUTO_NIGHT_MODE = '[SETTINGS] APPEARANCE_AUTO_NIGHT_MODE',
  LANGUAGE = '[SETTINGS] LANGUAGE',
}

const { Navigator, Screen } = createNativeStackNavigator();

const SettingsMainStack: FC = () => {
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator screenOptions={defaultScreenOptions}>
      <Screen
        name={SettingsMainScreen.LIST}
        component={List}
        options={{
          headerTitle: t('settings:settings'),
        }}
      />

      <Screen
        name={SettingsMainScreen.APPEARANCE}
        component={Appearance}
        options={{
          headerTitle: t('settings:appearance'),
        }}
      />
      <Screen
        name={SettingsMainScreen.APPEARANCE_AUTO_NIGHT_MODE}
        component={AppearanceAutoNightMode}
        options={{
          headerTitle: t('settings:autoNightMode'),
        }}
      />

      <Screen
        name={SettingsMainScreen.LANGUAGE}
        component={Language}
        options={{
          headerTitle: t('settings:language'),
        }}
      />
    </Navigator>
  );
};

export const SettingsMainStackConfig: BottomTabConfig = {
  parentOptions: {
    tabBarLabel: t('settings:settings'),
    tabBarIcon: ({ color, size }) => <Icon name="gear" size={size} color={color} />,
  },
  screens: [
    {
      name: '[STACKS] SETTINGS MAIN',
      children: Object.values(SettingsMainScreen),
      component: SettingsMainStack,
    },
  ],
};
