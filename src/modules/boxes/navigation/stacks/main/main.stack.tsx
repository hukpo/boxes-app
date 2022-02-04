import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { List } from '../../../screens';
import { Background } from '@navigation';

export enum BoxesMainScreen {
  LIST = '[BOXES MAIN] LIST',
}

const { Navigator, Screen } = createStackNavigator();

export const BoxesMainStack: FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <Navigator
      initialRouteName={BoxesMainScreen.LIST}
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <Background />,
      }}
    >
      <Screen
        name={BoxesMainScreen.LIST}
        component={List}
        options={{
          headerTitle: t('boxes:boxes'),
          headerBackTitle: t('navigation:back'),
          gestureEnabled: true,
          gestureResponseDistance: width,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  );
};
