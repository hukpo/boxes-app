import { Platform } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useTheme, Theme } from '@/themes';

export const useDefaultScreenOptions = (overrideTheme?: Theme): NativeStackNavigationOptions => {
  let theme = useTheme();

  if (overrideTheme) {
    theme = overrideTheme;
  }

  return {
    orientation: 'portrait',
    animation: 'slide_from_right',
    headerTransparent: true,
    fullScreenGestureEnabled: true,
    ...Platform.select({
      android: {
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
      },
      ios: {
        headerBlurEffect: theme.dark ? 'dark' : 'light',
      },
    }),
  };
};
