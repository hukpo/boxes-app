import { runInAction, toJS } from 'mobx';

import { makeSimpleAutoObservable } from '@/stores';
import { logger, getS3Image, S3Image } from '@/helpers';

export class MessageImageVm {
  private _image: S3Image | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get image(): S3Image | null {
    return toJS(this._image);
  }

  async getUri(key: string): Promise<void> {
    try {
      const image = await getS3Image(key);

      runInAction(() => (this._image = image));
    } catch (err) {
      logger.error(err);
    }
  }
}
