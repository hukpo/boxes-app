import { useTranslation } from 'react-i18next';
import React, { FC, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { CodeVm } from './code.vm';
import { HeaderButton } from '@/navigation';

export const useCodeNavigation = (vm: CodeVm): void => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    const headerRight: FC = () => (
      <HeaderButton title={t('next')} onPress={vm.confirmPhone} disabled={vm.nextButtonDisabled} />
    );

    setOptions({ headerRight, headerTitle: vm.phoneNumber });
  }, [setOptions, t, vm.confirmPhone, vm.nextButtonDisabled, vm.phoneNumber]);
};
