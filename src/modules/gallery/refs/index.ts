import { singleton } from 'tsyringe';
import { Asset } from 'expo-media-library';

import { Navigation } from '@/navigation';
import { GalleryMainScreen } from '../navigation';

type OpenOptions = {
  selectAsset: (asset: Asset) => void;
};

@singleton()
export class Gallery {
  private _options: OpenOptions | null = null;

  constructor(private _navigation: Navigation) {}

  selectAsset(asset: Asset): void {
    this._options?.selectAsset(asset);

    this._options = null;

    this._navigation.popToTop();
    this._navigation.goBack();
  }

  open(options: OpenOptions): void {
    this._navigation.navigate(GalleryMainScreen.ALBUMS);

    this._options = options;
  }
}
