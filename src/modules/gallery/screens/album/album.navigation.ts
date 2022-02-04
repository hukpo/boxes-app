import { useCallback, useLayoutEffect } from 'react';
import { Route, useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';

import { AlbumVm } from './album.vm';

export const useAlbumNavigation = (vm: AlbumVm): void => {
  const { setOptions } = useNavigation();
  const {
    params: { albumId, albumTitle },
  } = useRoute<Route<string, { albumId: string; albumTitle: string }>>();

  useFocusEffect(
    useCallback(() => {
      vm.getAssets(albumId);
    }, [vm, albumId]),
  );

  useLayoutEffect(() => {
    setOptions({
      headerTitle: albumTitle,
    });
  }, [setOptions, albumTitle]);
};
