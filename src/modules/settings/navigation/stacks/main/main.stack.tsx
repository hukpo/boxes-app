import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '@/themes';
import { Appearance, AppearanceAutoNightMode, Language, List } from '../../../screens';

export enum SettingsMainScreen {
  LIST = '[SETTINGS] LIST',
  APPEARANCE = '[SETTINGS] APPEARANCE',
  APPEARANCE_AUTO_NIGHT_MODE = '[SETTINGS] APPEARANCE_AUTO_NIGHT_MODE',
  LANGUAGE = '[SETTINGS] LANGUAGE',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const SettingsMainStack: FC = () => {
  const { dark } = useTheme();
  const { t } = useTranslation(['settings']);

  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        animation: 'slide_from_right',
        fullScreenGestureEnabled: true,
        headerBlurEffect: dark ? 'dark' : 'light',
      }}>
      <Screen
        name={SettingsMainScreen.LIST}
        component={List}
        options={{
          headerTitle: t('settings'),
        }}
      />

      <Screen
        name={SettingsMainScreen.APPEARANCE}
        component={Appearance}
        options={{
          headerTitle: t('appearance'),
        }}
      />
      <Screen
        name={SettingsMainScreen.APPEARANCE_AUTO_NIGHT_MODE}
        component={AppearanceAutoNightMode}
        options={{
          headerTitle: t('autoNightMode'),
        }}
      />

      <Screen
        name={SettingsMainScreen.LANGUAGE}
        component={Language}
        options={{
          headerTitle: t('language'),
        }}
      />
    </Navigator>
  );
};
