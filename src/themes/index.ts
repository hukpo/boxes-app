import { container } from 'tsyringe';
import { useColorScheme } from 'react-native';
import { setBackgroundColorAsync } from 'expo-system-ui';
import { useTheme as useNavigationTheme } from '@react-navigation/native';

import { Theme } from './theme.type';
import { ThemeStore } from '@/stores';
import { AutoNightMode } from '@/modules';
import { DARK_THEME } from './dark.theme';
import { LIGHT_THEME } from './light.theme';

export const useContainerTheme = (): Theme => {
  const scheme = useColorScheme();
  const themeStore = container.resolve(ThemeStore);

  let theme = DARK_THEME;

  switch (themeStore.autoNightMode) {
    case AutoNightMode.SYSTEM:
      theme = scheme === 'dark' ? DARK_THEME : LIGHT_THEME;
      break;
    case AutoNightMode.DISABLED:
      theme = themeStore.nightModeToggled ? DARK_THEME : LIGHT_THEME;
      break;
  }

  setBackgroundColorAsync(theme.colors.secondary);

  return theme;
};

export const useTheme = useNavigationTheme as () => Theme;
