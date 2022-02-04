import { toJS } from 'mobx';

import { makeSimpleAutoObservable } from '@/stores';

type ImageSource = number | { uri: string };

export class ImageVm {
  private _source: ImageSource | null = null;

  constructor() {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get source(): ImageSource | null {
    return toJS(this._source);
  }
  setSource(value: ImageSource): void {
    this._source = value;
  }
}
