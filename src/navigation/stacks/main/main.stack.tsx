import { container } from 'tsyringe';
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { STACKS } from '../../constants';
import { useContainerTheme } from '@/themes';
import { Navigation } from '../../navigation';
import { BottomMenuStack } from '../bottom-menu';
import { AuthMainStack, BoxesCreateStack, ChatMainStack, GalleryMainStack } from '@/modules';

const { Navigator, Screen } = createNativeStackNavigator();

export const MainStack = observer(() => {
  const theme = useContainerTheme();
  const navigation = container.resolve(Navigation);

  return (
    <Fragment>
      <StatusBar barStyle={theme?.dark ? 'light-content' : 'dark-content'} />

      <NavigationContainer
        theme={theme}
        ref={navigation.ref}
        onReady={navigation.onReady}
        onStateChange={navigation.onStateChange}>
        <PortalProvider>
          <Navigator initialRouteName={STACKS.BottomMenu.name} screenOptions={{ headerShown: false }}>
            <Screen
              name={STACKS.ChatMain.name}
              component={ChatMainStack}
              options={{
                animation: 'slide_from_right',
                fullScreenGestureEnabled: true,
              }}
            />
            <Screen name={STACKS.BottomMenu.name} component={BottomMenuStack} />
            <Screen
              name={STACKS.BoxesCreate.name}
              component={BoxesCreateStack}
              options={{
                presentation: 'modal',
                animation: 'slide_from_right',
              }}
            />
            <Screen
              name={STACKS.AuthMain.name}
              component={AuthMainStack}
              options={{
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
              }}
            />
            <Screen
              name={STACKS.GalleryMain.name}
              component={GalleryMainStack}
              options={{
                presentation: 'modal',
                animation: 'slide_from_right',
              }}
            />
          </Navigator>
        </PortalProvider>
      </NavigationContainer>
    </Fragment>
  );
});
