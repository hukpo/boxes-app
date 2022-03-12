import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useVm } from '@/hooks';
import { AppearanceVm } from './appearance.vm';
import { useHeaderHeight } from '@/navigation';
import { ListContainer, ListItem } from '@/components';

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
