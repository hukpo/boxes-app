import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, ListRenderItem, StyleSheet } from 'react-native';
import Animated, { ILayoutAnimationBuilder, Layout } from 'react-native-reanimated';

import { ListVm } from './list.vm';
import { useTheme } from '@/themes';
import { ActionSheet } from '@/ui-kit';
import { BoxObject } from '../../types';
import { BoxListRow } from '../../components';
import { useHeaderHeight } from '@/navigation';
import { BOX_ROW_HEIGHT } from '../../constants';
import { useListNavigation } from './list.navigation';
import { useRealmListUpdate, useSwipableRows, useVm } from '@/hooks';

export const List = observer(() => {
  const vm = useVm(ListVm);
  const { colors } = useTheme();
  const rowsManager = useSwipableRows();
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation(['boxes']);
  const { actionSheetRef } = useListNavigation(vm);
  const bottomMenuHeight = useBottomTabBarHeight();

  useRealmListUpdate(vm.boxes);

  const renderItem: ListRenderItem<BoxObject> = ({ item }) => {
    return <BoxListRow box={item} />;
  };

  const keyExtractor = (item: BoxObject): string => item._id;

  const getItemLayout = (
    _: BoxObject[] | null | undefined,
    index: number,
  ): { index: number; length: number; offset: number } => ({
    index,
    length: BOX_ROW_HEIGHT,
    offset: BOX_ROW_HEIGHT * index,
  });

  const reanimatedProps: { itemLayoutAnimation: ILayoutAnimationBuilder } = {
    itemLayoutAnimation: Layout.duration(200),
  };

  return (
    <>
      <Animated.FlatList
        {...reanimatedProps}
        style={{ backgroundColor: colors.secondary }}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: headerHeight,
            paddingBottom: bottomMenuHeight,
          },
        ]}
        data={vm.boxes}
        scrollEnabled={!!vm.boxes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        onScrollBeginDrag={rowsManager.closeAll}
        removeClippedSubviews={false}
        ListEmptyComponent={<ActivityIndicator style={styles.loader} />}
      />

      <ActionSheet.Container ref={actionSheetRef}>
        <ActionSheet.Button title={t('createFolder')} onPress={vm.createFolder} />
        <ActionSheet.Button title={t('createChat')} onPress={vm.createChat} />
      </ActionSheet.Container>
    </>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  loader: {
    flex: 1,
  },
});
