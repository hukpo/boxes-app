import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { Background } from '@/navigation';
import { Appearance, AppearanceAutoNightMode, Language, List } from '../../../screens';

export enum SettingsMainScreen {
  LIST = '[SETTINGS] LIST',
  APPEARANCE = '[SETTINGS] APPEARANCE',
  APPEARANCE_AUTO_NIGHT_MODE = '[SETTINGS] APPEARANCE_AUTO_NIGHT_MODE',
  LANGUAGE = '[SETTINGS] LANGUAGE',
}

const { Navigator, Screen } = createStackNavigator();

export const SettingsMainStack: FC = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation(['settings']);

  return (
    <Navigator
      screenOptions={{
        headerBackTitle: t('back', { ns: 'navigation' }),
        headerTransparent: true,
        headerBackground: () => <Background />,
        gestureEnabled: true,
        gestureResponseDistance: width,
        ...TransitionPresets.SlideFromRightIOS,
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
