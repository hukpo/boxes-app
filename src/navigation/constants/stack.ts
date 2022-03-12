import { BottomMenuStackConfig } from '../stacks';
import { AuthMainStackConfig, BoxesMainStackConfig, GalleryMainStackConfig, SettingsMainStackConfig } from '@/modules';

export const STACKS = [
  BottomMenuStackConfig,
  BoxesMainStackConfig,
  SettingsMainStackConfig,
  AuthMainStackConfig,
  GalleryMainStackConfig,
].reduce<Record<string, string[]>>((stacks, stack) => {
  stack.screens.forEach(screen => {
    stacks[screen.name] = screen.children || [];
  });

  return stacks;
}, {});
