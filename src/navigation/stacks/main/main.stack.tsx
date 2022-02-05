import { container } from 'tsyringe';
import { observer } from 'mobx-react-lite';
import { PortalProvider } from '@gorhom/portal';
import React, { Fragment, useEffect } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { AppStore } from '@/stores';
import { STACKS } from '../../constants';
import { useContainerTheme } from '@/themes';
import { Navigation } from '../../navigation';
import { BottomMenuStack } from '../bottom-menu';
import { AuthMainStack, BoxesCreateStack, ChatMainStack, GalleryMainStack } from '@/modules';

const { Navigator, Screen } = createStackNavigator();

export const MainStack = observer(() => {
  const theme = useContainerTheme();
  const { width } = useWindowDimensions();
  const navigation = container.resolve(Navigation);

  useEffect(() => {
    container.resolve(AppStore).main();

    return () => navigation.setIsReady(false);
  }, [navigation]);

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
                gestureEnabled: true,
                gestureResponseDistance: width,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <Screen name={STACKS.BottomMenu.name} component={BottomMenuStack} />
            <Screen name={STACKS.BoxesCreate.name} component={BoxesCreateStack} options={{ presentation: 'modal' }} />
            <Screen
              name={STACKS.AuthMain.name}
              component={AuthMainStack}
              options={TransitionPresets.ModalSlideFromBottomIOS}
            />

            <Screen name={STACKS.GalleryMain.name} component={GalleryMainStack} options={{ presentation: 'modal' }} />
          </Navigator>
        </PortalProvider>
      </NavigationContainer>
    </Fragment>
  );
});
