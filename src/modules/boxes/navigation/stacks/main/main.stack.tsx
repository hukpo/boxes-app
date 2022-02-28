import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { List } from '../../../screens';
import { useDefaultScreenOptions } from '@/navigation';

export enum BoxesMainScreen {
  LIST = '[BOXES MAIN] LIST',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const BoxesMainStack: FC = () => {
  const { t } = useTranslation();
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator initialRouteName={BoxesMainScreen.LIST} screenOptions={defaultScreenOptions}>
      <Screen
        name={BoxesMainScreen.LIST}
        component={List}
        options={{
          headerTitle: t('boxes:boxes'),
        }}
      />
    </Navigator>
  );
};
