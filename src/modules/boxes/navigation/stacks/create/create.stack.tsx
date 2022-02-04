import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';

import { Create } from '../../../screens';
import { Background, HeaderButton } from '@navigation';

export enum BoxesCreateScreen {
  MAIN = '[BOXES CREATE] MAIN',
}

const { Navigator, Screen } = createStackNavigator();

export const BoxesCreateStack: FC = () => {
  const { t } = useTranslation();

  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => <Background />,
      }}
    >
      <Screen
        name={BoxesCreateScreen.MAIN}
        component={Create}
        options={{
          headerLeft: ({ onPress }) => <HeaderButton title={t('cancel')} onPress={onPress} />,
        }}
      />
    </Navigator>
  );
};
