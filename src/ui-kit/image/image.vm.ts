import { getImageUri, logger } from '@/helpers';
import { makeSimpleAutoObservable } from '@/stores';

export type ImageSource = { uri: string } | { uriKey: string };

export class ImageVm {
  private _uri: string | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get uri(): string | null {
    return this._uri;
  }
  setUri(value: string): void {
    this._uri = value;
  }

  setSource(source: ImageSource): void {
    if ('uriKey' in source) {
      this.getUri(source.uriKey);
    } else {
      this.setUri(source.uri);
    }
  }

  private async getUri(key: string): Promise<void> {
    try {
      const uri = await getImageUri(key);

      this.setUri(uri);
    } catch (err) {
      logger.error(err);
    }
  }
}
