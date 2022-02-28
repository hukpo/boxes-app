import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useLayoutEffect } from 'react';
import { Route, useNavigation, useRoute } from '@react-navigation/core';

import { CreateVm } from './create.vm';
import { HeaderButton } from '@/navigation';
import { Box, BoxType } from '../../models';

export const useCreateNavigation = (vm: CreateVm): { type: BoxType } => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();
  const {
    params: { type, parentId },
  } = useRoute<Route<string, { type: BoxType; parentId: Box['parentId'] }>>();

  useEffect(() => {
    vm.setType(type);
    vm.setParentId(parentId);
  }, [vm, type, parentId]);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t(type === BoxType.FOLDER ? 'createFolder' : 'createChat', { ns: 'boxes' }),
      headerRight: () => <HeaderButton title={t('save')} onPress={vm.saveBox} disabled={!vm.boxName.value.trim()} />,
      ...Platform.select({
        ios: {
          headerLeft: () => <HeaderButton title={t('cancel')} />,
        },
      }),
    });
  }, [setOptions, t, vm.saveBox, vm.boxName.value, type]);

  return { type };
};
