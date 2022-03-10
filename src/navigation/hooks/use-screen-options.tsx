import React from 'react';
import { Platform } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useTheme } from '@/themes';
import { HeaderButton } from '../components';

export const useDefaultScreenOptions = (): NativeStackNavigationOptions => {
  const { dark, colors } = useTheme();

  return {
    animation: 'slide_from_right',
    headerTransparent: true,
    fullScreenGestureEnabled: true,
    headerLeft: props => <HeaderButton backIconVisible canGoBack={props.canGoBack} />,
    ...Platform.select({
      android: {
        headerStyle: {
          backgroundColor: colors.card,
        },
      },
      ios: {
        headerBlurEffect: dark ? 'dark' : 'light',
      },
    }),
  };
};
