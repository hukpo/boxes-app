import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, TextInput, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { useVm } from '@/hooks';
import { CodeVm } from './code.vm';
import { useTheme } from '@/themes';
import { useCodeNavigation } from './code.navigation';

const CONTENT_PADDING = 50;

export const Code = observer(() => {
  const vm = useVm(CodeVm);
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  useCodeNavigation(vm);

  return (
    <View style={[styles.container, { paddingTop: headerHeight + CONTENT_PADDING }]}>
      <TextInput
        autoFocus
        maxLength={6}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        value={vm.code.value}
        onChangeText={vm.code.setValue}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  input: {
    width: 100,
    padding: 10,
    fontSize: 20,
    borderWidth: 2,
    textAlign: 'center',
  },
});
