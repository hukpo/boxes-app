import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useVm } from '@hooks';
import { AppearanceVm } from './appearance.vm';
import { useNavigationLayout } from '@navigation';
import { ListContainer, ListItem } from '@components';

export const Appearance = observer(() => {
  const vm = useVm(AppearanceVm);
  const { t } = useTranslation(['settings']);
  const { style } = useNavigationLayout();
  const { left, right } = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[style, { paddingLeft: left, paddingRight: right }]}>
      <ListContainer>
        <ListItem
          title={t('nightMode')}
          onPress={vm.toggleNightMode}
          toggled={vm.nightModeToggled}
          disabled={!vm.nightModeEnabled}
        />
        <ListItem title={t('autoNightMode')} hasArrow onPress={vm.openAutoNightMode} />
      </ListContainer>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
