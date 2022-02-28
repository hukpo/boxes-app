import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Main } from '../../../screens';
import { useDefaultScreenOptions } from '@/navigation';

export enum ChatMainScreen {
  MAIN = '[CHAT MAIN] MAIN',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const ChatMainStack: FC = () => {
  const { t } = useTranslation('navigation');
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator initialRouteName={ChatMainScreen.MAIN} screenOptions={defaultScreenOptions}>
      <Screen
        name={ChatMainScreen.MAIN}
        component={Main}
        options={{
          headerBackTitle: t('back'),
        }}
      />
    </Navigator>
  );
};
