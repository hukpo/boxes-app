import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useRoute } from '@react-navigation/core';

import { Box } from '../../types';
import { EditVm } from './edit.vm';
import { HeaderButton, useNavigationOptions } from '@/navigation';

export const useEditNavigation = (vm: EditVm): void => {
  const {
    params: { boxId },
  } = useRoute<Route<string, { boxId: Box['parentId'] }>>();
  const { t } = useTranslation();

  useEffect(() => {
    if (boxId) {
      vm.setParent(boxId);
    }
  }, [vm, boxId]);

  useNavigationOptions(
    () => ({
      headerLeft: () => <HeaderButton title={t('cancel')} />,
      headerRight: () => <HeaderButton title={t('done')} onPress={vm.saveChanges} />,
    }),
    [t, vm.saveChanges],
  );
};
