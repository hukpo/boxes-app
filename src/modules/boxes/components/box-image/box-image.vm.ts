import { getImageUri, logger } from '@/helpers';
import { makeSimpleAutoObservable } from '@/stores';

export class BoxImageVm {
  private _uri: string | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get uri(): string | null {
    return this._uri;
  }
  setUri(value: string | null): void {
    this._uri = value;
  }

  getTitle(value: string): string {
    if (!value) {
      return '';
    }

    return value[0].toUpperCase();
  }

  async getUri(key: string | undefined): Promise<void> {
    try {
      if (!key) {
        return this.setUri(null);
      }

      const uri = await getImageUri(key);

      this.setUri(uri);
    } catch (err) {
      logger.error(err);
    }
  }
}
