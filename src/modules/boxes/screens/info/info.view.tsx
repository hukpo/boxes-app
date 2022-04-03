import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVm } from '@/hooks';
import { Text } from '@/ui-kit';
import { InfoVm } from './info.vm';
import { useTheme } from '@/themes';
import { BoxImage } from '../../components';
import { PHOTO_PREVIEW_SIZE } from '../../constants';
import { useInfoNavigation } from './info.navigation';

export const Info = observer(() => {
  const vm = useVm(InfoVm);
  const { colors } = useTheme();

  useInfoNavigation(vm);

  if (!vm.parent) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BoxImage
        type={vm.parent.type}
        containerStyle={styles.previewItem}
        key={vm.parent._id}
        size={PHOTO_PREVIEW_SIZE}
        color={vm.parent.imageBg}
        title={vm.parent.name}
        uriKey={vm.parent.key}
      />

      <Text style={[styles.name, { color: colors.text }]}>{vm.parent.name}</Text>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  previewItem: {},
  name: {
    fontSize: 30,
    marginTop: 25,
  },
});
