import { runInAction } from 'mobx';
import { autoInjectable } from 'tsyringe';
import { Album, getAlbumsAsync, requestPermissionsAsync } from 'expo-media-library';

import { logger } from '@/helpers';
import { Navigation } from '@/navigation';
import { makeSimpleAutoObservable } from '@/stores';
import { GalleryMainScreen } from '../../navigation';

@autoInjectable()
export class AlbumsVm {
  private _albums: Album[] = [];

  constructor(private _navigation: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get albums(): Album[] {
    return this._albums;
  }

  async getAlbums(): Promise<void> {
    try {
      logger.info('Trying to get albums');

      const { granted, accessPrivileges } = await requestPermissionsAsync();

      logger.info(`Permission: ${accessPrivileges}`);

      if (!granted) {
        return;
      }

      const albums = await getAlbumsAsync({ includeSmartAlbums: true });

      runInAction(() => (this._albums = albums));
    } catch (err) {
      logger.error(err);
    }
  }

  openAlbum(album: Album): void {
    this._navigation.navigate(GalleryMainScreen.ALBUM, { albumId: album.id, albumTitle: album.title });
  }
}
