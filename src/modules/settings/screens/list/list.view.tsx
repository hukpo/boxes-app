import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useVm } from '@/hooks';
import { ListVm } from './list.vm';
import { List as UIList } from '@/ui-kit';
import { useHeaderHeight } from '@/navigation';

export const List: FC = () => {
  const vm = useVm(ListVm);
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation(['settings']);
  const bottomMenuHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: bottomMenuHeight,
      }}>
      <UIList.Container>
        <UIList.Item
          title={t('appearance')}
          hasArrow
          onPress={vm.openAppearance}
          iconName="blur"
          iconBackground="#32c0fc"
        />
        <UIList.Item
          title={t('language')}
          hasArrow
          onPress={vm.openLanguage}
          iconName="global"
          iconBackground="#c700c7"
        />
      </UIList.Container>

      <UIList.Container style={styles.listContainer}>
        <UIList.Item title={t('logOut')} titleStyle="destructive" onPress={vm.logOut} />
      </UIList.Container>
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
