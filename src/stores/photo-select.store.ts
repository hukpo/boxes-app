import { autoInjectable } from 'tsyringe';
import { Asset } from 'expo-media-library';

import { Gallery } from '@/modules';
import { makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class PhotoSelectStore {
  private _selectedPhoto: Asset | null = null;

  constructor(private _gallery?: Gallery) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get selected(): Asset | null {
    return this._selectedPhoto;
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
    this._selectedPhoto = asset;
  }
}
