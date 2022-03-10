import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Create } from '../../../screens';
import { useDefaultScreenOptions } from '@/navigation';

export enum BoxesCreateScreen {
  MAIN = '[BOXES CREATE] MAIN',
}

const { Navigator, Screen } = createNativeStackNavigator();

export const BoxesCreateStack: FC = () => {
  const defaultScreenOptions = useDefaultScreenOptions();

  return (
    <Navigator screenOptions={defaultScreenOptions}>
      <Screen name={BoxesCreateScreen.MAIN} component={Create} />
    </Navigator>
  );
};
