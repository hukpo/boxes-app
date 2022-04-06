import { AuthMainScreen, BoxesMainScreen, GalleryMainScreen, SettingsMainScreen } from '@/modules';

export const STACKS = {
  BottomMenu: {
    name: '[STACKS] BOTTOM MENU',
    screens: [],
  },
  AuthMain: {
    name: '[STACKS] AUTH MAIN',
    screens: Object.values(AuthMainScreen),
  },
  BoxesMain: {
    name: '[STACKS] BOXES MAIN',
    screens: Object.values(BoxesMainScreen),
  },
  GalleryMain: {
    name: '[STACKS] GALLERY MAIN',
    screens: Object.values(GalleryMainScreen),
  },
  SettingsMain: {
    name: '[STACKS] SETTINGS MAIN',
    screens: Object.values(SettingsMainScreen),
  },
};
