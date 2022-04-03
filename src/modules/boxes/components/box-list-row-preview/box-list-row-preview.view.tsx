import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet } from 'react-native';

import { BoxImage } from '../box-image';
import { BoxObject } from '../../types';
import { useRealmObjectUpdate } from '@/hooks';
import { BOX_PREVIEW_ITEM_HEIGHT, BOX_PREVIEW_ITEM_MARGIN_RIGHT } from '../../constants';

type BoxListRowPreviewProps = {
  box: BoxObject;
  onPress: () => void;
};

export const BoxListRowPreview = observer<BoxListRowPreviewProps>(({ box, onPress }) => {
  useRealmObjectUpdate(box);

  return (
    <BoxImage
      type={box.type}
      containerStyle={styles.previewItem}
      size={BOX_PREVIEW_ITEM_HEIGHT}
      color={box.imageBg}
      title={box.name}
      uriKey={box.key}
      onPress={onPress}
    />
  );
});

const styles = StyleSheet.create({
  previewItem: {
    marginRight: BOX_PREVIEW_ITEM_MARGIN_RIGHT,
  },
});
