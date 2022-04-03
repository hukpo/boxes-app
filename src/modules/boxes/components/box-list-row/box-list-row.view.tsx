import { observer } from 'mobx-react-lite';
import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/ui-kit';
import { useTheme } from '@/themes';
import { BoxImage } from '../box-image';
import { BoxObject } from '../../types';
import { SwipableView } from '@/components';
import { BoxListRowVm } from './box-list-row.vm';
import { BoxListRowPreview } from '../box-list-row-preview';
import { useRealmListUpdate, useRealmObjectUpdate, useVm } from '@/hooks';
import {
  BOX_SPACING,
  BOX_ROW_HEIGHT,
  BOX_NAME_LINE_HEIGHT,
  BOX_ROW_IMAGE_HEIGHT,
  BOX_PREVIEW_MAX_ITEMS,
  BOX_PREVIEW_MARGIN_TOP,
  BOX_PREVIEW_ITEM_MARGIN_RIGHT,
} from '../../constants';

type BoxListRowProps = {
  box: BoxObject;
};

const BoxListRowNoMemo = observer<BoxListRowProps>(({ box }) => {
  const { colors } = useTheme();
  const vm = useVm(BoxListRowVm, box);
  const { left, right } = useSafeAreaInsets();

  useRealmObjectUpdate(box);
  useRealmListUpdate(vm.previewBoxes);

  if (Math.random()) {
    const [] = useState();
  }

  return (
    <SwipableView
      id={box._id}
      style={[
        styles.container,
        {
          paddingLeft: left + BOX_SPACING,
          backgroundColor: colors.secondary,
        },
      ]}
      snapWidth={BOX_ROW_HEIGHT + right}
      onPress={vm.openBox}
      onButtonPress={vm.deleteBox}>
      <BoxImage
        type={box.type}
        containerStyle={styles.image}
        size={BOX_ROW_IMAGE_HEIGHT}
        color={box.imageBg}
        title={box.name}
        uriKey={box.key}
        onPress={vm.openBox}
      />

      <View
        style={[styles.infoContainer, { borderBottomColor: colors.greyDark, paddingRight: right }]}>
        <Text style={[styles.name, { color: colors.text }]}>{box.name}</Text>

        <View style={styles.previewContainer}>
          {vm.previewBoxes?.slice(0, BOX_PREVIEW_MAX_ITEMS)?.map(previewBox => {
            const onPress = (): void => vm.openBox(previewBox);

            return <BoxListRowPreview key={previewBox._id} box={previewBox} onPress={onPress} />;
          })}
        </View>
      </View>
    </SwipableView>
  );
});

export const BoxListRow = memo<BoxListRowProps>(
  BoxListRowNoMemo,
  (prev, curr) => prev.box._id === curr.box._id,
);

BoxListRow.whyDidYouRender = true;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BOX_ROW_HEIGHT,
  },

  image: {
    marginRight: BOX_SPACING,
  },

  infoContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingVertical: BOX_SPACING,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: BOX_NAME_LINE_HEIGHT,
  },

  previewContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: BOX_PREVIEW_MARGIN_TOP,
  },
  previewItem: {
    marginRight: BOX_PREVIEW_ITEM_MARGIN_RIGHT,
  },
});
