import { runInAction } from 'mobx';
import { Asset, getAssetsAsync, PagedInfo } from 'expo-media-library';

import { logger } from '@helpers';
import { makeSimpleAutoObservable } from '@stores';

export class AlbumVm {
  private _assetsPagedInfo: PagedInfo<Asset> | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get assets(): Asset[] {
    if (!this._assetsPagedInfo) {
      return [];
    }

    return this._assetsPagedInfo.assets;
  }

  async getAssets(albumId: string): Promise<void> {
    try {
      const assetsPagedInfo = await getAssetsAsync({
        album: albumId,
      });

      runInAction(() => (this._assetsPagedInfo = assetsPagedInfo));
    } catch (err) {
      logger.error(err);
    }
  }
}
