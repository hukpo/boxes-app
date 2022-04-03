import { autoInjectable } from 'tsyringe';
import { Asset } from 'expo-media-library';

import { Gallery } from '@/modules';
import { makeSimpleAutoObservable } from '@/stores';
import { ImageProps } from '@/ui-kit';

type SelectedPhoto = {
  aspectRatio: number;
  source: ImageProps['source'];
};

@autoInjectable()
export class PhotoSelectStore {
  private _selectedPhoto: SelectedPhoto | null = null;

  constructor(private _gallery?: Gallery) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get selected(): SelectedPhoto | null {
    return this._selectedPhoto;
  }
  setSelected(value: SelectedPhoto): void {
    this._selectedPhoto = value;
  }

  openGallery(): void {
    this._gallery?.open({
      selectAsset: this.selectAsset,
    });
  }

  removePhoto(): void {
    this._selectedPhoto = null;
  }

  private selectAsset(asset: Asset): void {
    this._selectedPhoto = {
      source: { uri: asset.uri },
      aspectRatio: asset.width / asset.height,
    };
  }
}
