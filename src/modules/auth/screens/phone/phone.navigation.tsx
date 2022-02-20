import { useTranslation } from 'react-i18next';
import React, { FC, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { PhoneVm } from './phone.vm';
import { HeaderButton } from '@/navigation';

export const usePhoneNavigation = (vm: PhoneVm): void => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    const headerRight: FC = () => (
      <HeaderButton title={t('next')} onPress={vm.sendCode} disabled={vm.nextButtonDisabled} />
    );

    setOptions({ headerRight });
  }, [setOptions, t, vm.nextButtonDisabled, vm.sendCode]);
};
