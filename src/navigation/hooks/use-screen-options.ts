import { Platform } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useTheme } from '@/themes';

export const useDefaultScreenOptions = (): NativeStackNavigationOptions => {
  const { dark, colors } = useTheme();

  return {
    animation: 'slide_from_right',
    headerTransparent: true,
    fullScreenGestureEnabled: true,
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
