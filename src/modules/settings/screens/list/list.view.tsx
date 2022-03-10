import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useVm } from '@/hooks';
import { ListVm } from './list.vm';
import { ListItem, ListContainer } from '@/components';

export const List: FC = () => {
  const vm = useVm(ListVm);
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
          title={t('appearance')}
          hasArrow
          onPress={vm.openAppearance}
          iconName="blur"
          iconBackground="#32c0fc"
        />
        <ListItem title={t('language')} hasArrow onPress={vm.openLanguage} iconName="global" iconBackground="#c700c7" />
      </ListContainer>

      <ListContainer style={styles.listContainer}>
        <ListItem title={t('logOut')} titleStyle="destructive" onPress={vm.logOut} />
      </ListContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  listContainer: {
    marginTop: 10,
  },
});
