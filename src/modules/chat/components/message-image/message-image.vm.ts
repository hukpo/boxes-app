import { runInAction } from 'mobx';

import { logger, getImageUri } from '@/helpers';
import { makeSimpleAutoObservable } from '@/stores';

export class MessageImageVm {
  private _imageUri: string | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get imageUri(): string | null {
    return this._imageUri;
  }

  async getUri(key: string): Promise<void> {
    try {
      const imageUri = await getImageUri(key);

      runInAction(() => (this._imageUri = imageUri));
    } catch (err) {
      logger.error(err);
    }
  }
}
