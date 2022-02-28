import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { ListRenderItem } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, { ILayoutAnimationBuilder, Layout } from 'react-native-reanimated';

import { ListVm } from './list.vm';
import { useTheme } from '@/themes';
import { ActionSheet } from '@/ui-kit';
import { BoxObject } from '../../models';
import { BoxListRow } from '../../components';
import { BOX_ROW_HEIGHT } from '../../constants';
import { useListNavigation } from './list.navigation';
import { useRealmListUpdate, useSwipableRows, useVm } from '@/hooks';

export const List = observer(() => {
  const vm = useVm(ListVm);
  const { colors } = useTheme();
  const rowsManager = useSwipableRows();
  const { t } = useTranslation(['boxes']);
  const { actionSheetRef } = useListNavigation(vm);
  const headerHeight = useHeaderHeight();
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
    <Fragment>
      <Animated.FlatList
        {...reanimatedProps}
        style={{ backgroundColor: colors.secondary }}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: bottomMenuHeight,
        }}
        data={vm.boxes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        onScrollBeginDrag={rowsManager.closeAll}
        removeClippedSubviews={false}
      />

      <ActionSheet.Container ref={actionSheetRef}>
        <ActionSheet.Button title={t('createFolder')} onPress={vm.createFolder} />
        <ActionSheet.Button title={t('createChat')} onPress={vm.createChat} />
      </ActionSheet.Container>
    </Fragment>
  );
});
