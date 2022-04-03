import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from '@/ui-kit';
import { BNC, useDefaultScreenOptions } from '@/navigation';
import { Appearance, AppearanceAutoNightMode, Language, List } from '../screens';

export enum SettingsMainScreen {
  LIST = '[SETTINGS] LIST',
  APPEARANCE = '[SETTINGS] APPEARANCE',
  APPEARANCE_AUTO_NIGHT_MODE = '[SETTINGS] APPEARANCE_AUTO_NIGHT_MODE',
  LANGUAGE = '[SETTINGS] LANGUAGE',
}

const Stack = createNativeStackNavigator();

const SettingsMainStack: FC = () => {
  const { t } = useTranslation(['settings']);
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={SettingsMainScreen.LIST}
        component={List}
        options={{
          headerTitle: t('settings'),
        }}
      />

      <Stack.Screen
        name={SettingsMainScreen.APPEARANCE}
        component={Appearance}
        options={{
          headerTitle: t('appearance'),
        }}
      />
      <Stack.Screen
        name={SettingsMainScreen.APPEARANCE_AUTO_NIGHT_MODE}
        component={AppearanceAutoNightMode}
        options={{
          headerTitle: t('autoNightMode'),
        }}
      />

      <Stack.Screen
        name={SettingsMainScreen.LANGUAGE}
        component={Language}
        options={{
          headerTitle: t('language'),
        }}
      />
    </Stack.Navigator>
  );
};

export const SettingsMainNavigation: BNC = ({ Group, Screen }) => {
  const { t } = useTranslation(['settings']);

  return (
    <Group
      screenOptions={{
        tabBarLabel: t('settings'),
        tabBarIcon: ({ color, size }) => <Icon name="gear" size={size} color={color} />,
      }}>
      <Screen name="[STACKS] SETTINGS MAIN" component={SettingsMainStack} />
    </Group>
  );
};
