import React from 'react';
import { container } from 'tsyringe';
import { observer } from 'mobx-react-lite';
import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackConfig } from '../types';
import { Navigation } from '../navigation';
import { useContainerTheme } from '@/themes';
import { useDefaultScreenOptions } from '../hooks';
import { BottomMenuStackConfig } from './bottom-menu.stack';
import { AuthMainStackConfig, BoxesCreateStackConfig, ChatMainStackConfig, GalleryMainStackConfig } from '@/modules';

const { Navigator, Group, Screen } = createNativeStackNavigator();

const STACK_CONFIGS: StackConfig[] = [
  BottomMenuStackConfig,
  BoxesCreateStackConfig,
  ChatMainStackConfig,
  AuthMainStackConfig,
  GalleryMainStackConfig,
];

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
        <Navigator screenOptions={defaultScreenOptions}>
          {STACK_CONFIGS.map((config, index) => (
            <Group key={index} screenOptions={config.parentOptions}>
              {config.screens.map(screen => (
                <Screen key={screen.name} name={screen.name} component={screen.component} options={screen.options} />
              ))}
            </Group>
          ))}
        </Navigator>
      </PortalProvider>
    </NavigationContainer>
  );
});
