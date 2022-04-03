import React from 'react';

import { NC } from '@/navigation';
import { Edit, Info } from '../screens';

export enum BoxesManageScreen {
  INFO = '[BOXES MANAGE] INFO',
  EDIT = '[BOXES MANAGE] EDIT',
}

export const BoxesManageNavigation: NC = ({ Group, Screen }) => {
  return (
    <Group>
      <Screen
        name={BoxesManageScreen.INFO}
        component={Info}
        options={{ headerBlurEffect: undefined, headerTitle: '' }}
      />
      <Screen
        name={BoxesManageScreen.EDIT}
        component={Edit}
        options={{
          headerTitle: '',
          animation: 'fade',
          headerBlurEffect: undefined,
          presentation: 'fullScreenModal',
        }}
      />
    </Group>
  );
};
