import { runInAction } from 'mobx';

import { getImageUri, logger } from '@/helpers';
import { makeSimpleAutoObservable } from '@/stores';

export class BoxImageVm {
  private _uri: string | null = null;

  constructor(_uriKey: string | undefined) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });

    if (_uriKey) {
      this.getUri(_uriKey);
    }
  }

  get uri(): string | null {
    return this._uri;
  }

  private async getUri(key: string): Promise<void> {
    try {
      const uri = await getImageUri(key);

      runInAction(() => (this._uri = uri));
    } catch (err) {
      logger.error(err);
    }
  }
}
