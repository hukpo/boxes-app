import { Main } from '../screens';
import { StackConfig } from '@/navigation';

export enum ChatMainScreen {
  MAIN = '[CHAT MAIN] MAIN',
}

export const ChatMainStackConfig: StackConfig = {
  parentOptions: {
    fullScreenGestureEnabled: true,
  },
  screens: [
    {
      name: ChatMainScreen.MAIN,
      component: Main,
    },
  ],
};
