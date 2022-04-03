import { container } from 'tsyringe';
import React, { useMemo } from 'react';
import { Asset } from 'expo-media-library';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { useVm } from '@/hooks';
import { AlbumVm } from './album.vm';
import { Gallery } from '../../refs';
import { useHeaderHeight } from '@/navigation';
import { useAlbumNavigation } from './album.navigation';

export const Album = observer(() => {
  const vm = useVm(AlbumVm);
  const headerHeight = useHeaderHeight();
  const { left, right } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  useAlbumNavigation(vm);

  const { gap, assets, imageSize } = useMemo((): {
    gap: number;
    assets: Asset[][];
    imageSize: number;
  } => {
    const portraitWidth = width < height ? width : height;
    const safeAreaWidth = width - left - right;

    const _assets = [];
    const _imageSize = portraitWidth / 3;
    const _numberOfImagesInOneRow = Math.floor(safeAreaWidth / _imageSize);

    for (let i = 0; i < vm.assets.length; i += _numberOfImagesInOneRow) {
      _assets.push(vm.assets.slice(i, i + _numberOfImagesInOneRow));
    }

    return {
      assets: _assets,
      imageSize: _imageSize,
      gap: (safeAreaWidth - _numberOfImagesInOneRow * _imageSize) / (_numberOfImagesInOneRow - 1),
    };
  }, [vm.assets, width, height, left, right]);

  const renderItem: ListRenderItem<Asset[]> = ({ item }) => {
    return (
      <View style={styles.rowContainer}>
        {item.map((asset, index) => {
          const onPress = (): void => container.resolve(Gallery).selectAsset(asset);

          return (
            <Pressable key={asset.id} onPress={onPress}>
              <Image
                source={{ uri: asset.uri }}
                style={{ width: imageSize, height: imageSize, marginLeft: index && gap }}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };

  const keyExtractor = (_: Asset[], index: number): string => index.toString();

  return (
    <FlatList
      contentContainerStyle={{
        paddingLeft: left,
        paddingRight: right,
        paddingTop: headerHeight,
      }}
      data={assets}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
});
