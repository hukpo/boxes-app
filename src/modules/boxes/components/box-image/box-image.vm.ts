import { runInAction } from 'mobx';

import { getImageUri, logger } from '@/helpers';
import { makeSimpleAutoObservable } from '@/stores';

export class BoxImageVm {
  private _uri: string | null = null;

  constructor(private _title: string, _uriKey: string | undefined) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });

    if (_uriKey) {
      this.getUri(_uriKey);
    }
  }

  get uri(): string | null {
    return this._uri;
  }

  get title(): string {
    if (!this._title) {
      return '';
    }

    return this._title[0].toUpperCase();
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
