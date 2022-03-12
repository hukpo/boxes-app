import { Create } from '../screens';
import { StackConfig } from '@/navigation';

export enum BoxesCreateScreen {
  MAIN = '[BOXES CREATE] MAIN',
}

export const BoxesCreateStackConfig: StackConfig = {
  parentOptions: {
    presentation: 'modal',
  },
  screens: [
    {
      name: BoxesCreateScreen.MAIN,
      component: Create,
      options: {
        animation: 'slide_from_bottom',
      },
    },
  ],
};
