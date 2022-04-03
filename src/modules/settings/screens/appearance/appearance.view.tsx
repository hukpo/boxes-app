import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { List } from '@/ui-kit';
import { useVm } from '@/hooks';
import { AppearanceVm } from './appearance.vm';
import { useHeaderHeight } from '@/navigation';

export const Appearance = observer(() => {
  const vm = useVm(AppearanceVm);
  const { t } = useTranslation(['settings']);
  const headerHeight = useHeaderHeight();
  const bottomMenuHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: bottomMenuHeight,
      }}>
      <List.Container>
        <List.Item
          title={t('nightMode')}
          onPress={vm.toggleNightMode}
          toggled={vm.nightModeToggled}
          disabled={!vm.nightModeEnabled}
        />
        <List.Item title={t('autoNightMode')} hasArrow onPress={vm.openAutoNightMode} />
      </List.Container>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
