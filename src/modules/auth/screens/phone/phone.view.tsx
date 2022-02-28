import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { useVm } from '@/hooks';
import { Text } from '@/ui-kit';
import { useTheme } from '@/themes';
import { PhoneVm } from './phone.vm';
import { usePhoneNavigation } from './phone.navigation';

const CONTENT_PADDING = 50;

export const Phone = observer(() => {
  const vm = useVm(PhoneVm);
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation(['auth']);

  usePhoneNavigation(vm);

  return (
    <View style={[styles.container, { paddingTop: headerHeight + CONTENT_PADDING }]}>
      <Text style={[styles.phone, { color: colors.text }]}>{t('phone')}</Text>
      <Text style={[styles.phoneDescription, { color: colors.text }]}>{t('phoneDescription')}</Text>

      <View style={styles.inputsContainer}>
        <TextInput
          maxLength={4}
          keyboardType="phone-pad"
          style={[styles.input, styles.phoneCode, { borderColor: colors.border, color: colors.text }]}
          value={vm.phoneCode.value}
        />

        <TextInput
          autoFocus
          maxLength={9}
          keyboardType="phone-pad"
          style={[styles.input, styles.phoneNumber, { borderColor: colors.border, color: colors.text }]}
          value={vm.phoneNumber.value}
          onChangeText={vm.phoneNumber.setValue}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  phone: {
    fontSize: 25,
  },
  phoneDescription: {
    fontSize: 16,
    marginTop: 15,
    paddingHorizontal: 60,
    textAlign: 'center',
  },

  inputsContainer: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
  },
  input: {
    padding: 10,
    fontSize: 20,
    borderWidth: 2,
  },
  phoneCode: {
    width: 75,
    textAlign: 'center',
  },
  phoneNumber: {
    flex: 1,
    borderLeftWidth: 0,
  },
});
