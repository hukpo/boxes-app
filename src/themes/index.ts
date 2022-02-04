import { useColorScheme } from 'react-native';
import { setBackgroundColorAsync } from 'expo-system-ui';
import { useTheme as useNavigationTheme } from '@react-navigation/native';

import { useStores } from '@stores';
import { Theme } from './theme.type';
import { AutoNightMode } from '@modules';
import { DARK_THEME } from './dark.theme';
import { LIGHT_THEME } from './light.theme';

export const useContainerTheme = (): Theme | undefined => {
  const scheme = useColorScheme();
  const { themeStore } = useStores();

  let theme: Theme | undefined;

  switch (themeStore.autoNightMode) {
    case AutoNightMode.SYSTEM:
      theme = scheme === 'dark' ? DARK_THEME : LIGHT_THEME;
      break;
    case AutoNightMode.DISABLED:
      theme = themeStore.nightModeToggled ? DARK_THEME : LIGHT_THEME;
      break;
  }

  if (theme) {
    setBackgroundColorAsync(theme.colors.secondary);
  }

  return theme;
};

export const useTheme = useNavigationTheme as () => Theme;
