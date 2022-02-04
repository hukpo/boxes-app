import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';

import { useVm } from '@/hooks';
import { useTheme } from '@/themes';
import { Icon, Text } from '@/ui-kit';
import { AlbumsVm } from './albums.vm';

export const Albums = observer(() => {
  const vm = useVm(AlbumsVm);
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  const { left, right } = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      vm.getAlbums();
    }, [vm]),
  );

  return (
    <View style={[styles.container, { paddingTop: headerHeight, paddingLeft: left, paddingRight: right }]}>
      <ScrollView>
        {vm.albums.map(album => {
          const onPress = (): void => vm.openAlbum(album);

          return (
            <TouchableHighlight key={album.id} underlayColor={colors.highlight} onPress={onPress}>
              <View style={styles.albumContainer}>
                <View>
                  <Text style={[styles.title, { color: colors.text }]}>{album.title}</Text>
                  <Text style={[styles.assetsCount, { color: colors.text }]}>{album.assetCount}</Text>
                </View>

                <Icon name="arrow-right" width={7} color={colors.greyLight} />
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  albumContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {},
  assetsCount: {
    marginTop: 10,
  },
});
