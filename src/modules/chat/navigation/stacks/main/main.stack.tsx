import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';

import { Main } from '../../../screens';
import { Background } from '@navigation';

export enum ChatMainScreen {
  MAIN = '[CHAT MAIN] MAIN',
}

const { Navigator, Screen } = createStackNavigator();

export const ChatMainStack: FC = () => {
  const { t } = useTranslation('navigation');

  return (
    <Navigator
      initialRouteName={ChatMainScreen.MAIN}
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <Background />,
      }}
    >
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
