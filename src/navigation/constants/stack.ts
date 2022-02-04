import {
  AuthMainScreen,
  ChatMainScreen,
  BoxesMainScreen,
  BoxesCreateScreen,
  GalleryMainScreen,
  SettingsMainScreen,
} from '@modules';

export const STACKS = {
  BottomMenu: {
    name: '[STACKS] BOTTOM MENU',
  },
  BoxesMain: {
    name: '[STACKS] BOXES MAIN',
    screens: Object.values(BoxesMainScreen),
  },
  BoxesCreate: {
    name: '[STACKS] BOXES CREATE',
    screens: Object.values(BoxesCreateScreen),
  },
  ChatMain: {
    name: '[STACKS] CHAT MAIN',
    screens: Object.values(ChatMainScreen),
  },
  Settings: {
    name: '[STACKS] SETTINGS MAIN',
    screens: Object.values(SettingsMainScreen),
  },
  AuthMain: {
    name: '[STACKS] AUTH MAIN',
    screens: Object.values(AuthMainScreen),
  },
  GalleryMain: {
    name: '[STACKS] GALLERY MAIN',
    screens: Object.values(GalleryMainScreen),
  },
};
