import { useCallback } from 'react';
import { Route, useFocusEffect, useRoute } from '@react-navigation/core';

import { AlbumVm } from './album.vm';
import { useNavigationOptions } from '@/navigation';

export const useAlbumNavigation = (vm: AlbumVm): void => {
  const {
    params: { albumId, albumTitle },
  } = useRoute<Route<string, { albumId: string; albumTitle: string }>>();

  useFocusEffect(
    useCallback(() => {
      vm.getAssets(albumId);
    }, [vm, albumId]),
  );

  useNavigationOptions(
    () => ({
      headerTitle: albumTitle,
    }),
    [albumTitle],
  );
};
