import React from 'react';

import { NC } from '@/navigation';
import { Main } from '../screens';

export enum ChatMainScreen {
  MAIN = '[CHAT MAIN] MAIN',
}

export const ChatMainNavigation: NC = ({ Group, Screen }) => {
  return (
    <Group>
      <Screen name={ChatMainScreen.MAIN} component={Main} />
    </Group>
  );
};
