import React from 'react';

import { NC } from '@/navigation';
import { Create } from '../screens';

export enum BoxesCreateScreen {
  MAIN = '[BOXES CREATE] MAIN',
}

export const BoxesCreateNavigation: NC = ({ Group, Screen }) => {
  return (
    <Group
      screenOptions={{
        presentation: 'modal',
      }}>
      <Screen
        name={BoxesCreateScreen.MAIN}
        component={Create}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Group>
  );
};
