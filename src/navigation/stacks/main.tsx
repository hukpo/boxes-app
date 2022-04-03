import React from 'react';
import { container } from 'tsyringe';
import { observer } from 'mobx-react-lite';
import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Navigation } from '../navigation';
import { useContainerTheme } from '@/themes';
import { useDefaultScreenOptions } from '../hooks';
import { BottomMenuNavigation } from './bottom-menu';
import {
  AuthMainNavigation,
  ChatMainNavigation,
  BoxesCreateNavigation,
  BoxesManageNavigation,
  GalleryMainNavigation,
} from '@/modules';

const Stack = createNativeStackNavigator();

export const MainStack = observer(() => {
  const theme = useContainerTheme();
  const defaultScreenOptions = useDefaultScreenOptions(theme);
  const navigation = container.resolve(Navigation);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigation.ref}
      onReady={navigation.onReady}
      onStateChange={navigation.onStateChange}>
      <PortalProvider>
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          {BottomMenuNavigation(Stack)}
          {AuthMainNavigation(Stack)}
          {BoxesCreateNavigation(Stack)}
          {BoxesManageNavigation(Stack)}
          {ChatMainNavigation(Stack)}
          {GalleryMainNavigation(Stack)}
        </Stack.Navigator>
      </PortalProvider>
    </NavigationContainer>
  );
});
