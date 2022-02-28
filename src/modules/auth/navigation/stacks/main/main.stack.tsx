import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Code, Phone } from '../../../screens';
import { useTranslation } from 'react-i18next';

export enum AuthMainScreen {
  PHONE = '[AUTH] PHONE',
  CODE = '[AUTH] CODE',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthMainStack: FC = () => {
  const { t } = useTranslation(['navigation']);

  return (
    <Navigator>
      <Screen
        name={AuthMainScreen.PHONE}
        component={Phone}
        options={{
          headerTitle: '',
          gestureEnabled: false,
          headerBackVisible: false,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />

      <Screen
        name={AuthMainScreen.CODE}
        component={Code}
        options={{
          gestureEnabled: false,
          headerTransparent: true,
          headerBackTitle: t('back'),
        }}
      />
    </Navigator>
  );
};
