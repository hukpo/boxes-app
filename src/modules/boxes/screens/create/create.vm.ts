import { runInAction } from 'mobx';
import { autoInjectable } from 'tsyringe';
import { Asset } from 'expo-media-library';

import { BoxesDB } from '../../db';
import { Gallery } from '@/modules';
import { Navigation } from '@/navigation';
import { Box, BoxType } from '../../types';
import { ImageUploadStatus } from '@/types';
import { getRandomColor, logger, uploadImage } from '@/helpers';
import { InputStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class CreateVm {
  private _name = new InputStore();
  private _photo: Asset | null = null;
  private _type: BoxType | null = null;
  private _parentId: Box['parentId'] | null = null;

  constructor(private _db: BoxesDB, private _navigation: Navigation, private _gallery: Gallery) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get photoUri(): string | null {
    if (!this._photo) {
      return null;
    }

    return this._photo.uri;
  }

  get name(): InputStore {
    return this._name;
  }

  setType(value: BoxType): void {
    this._type = value;
  }

  setParentId(value: Box['parentId']): void {
    this._parentId = value;
  }

  // TODO LOADER
  async saveBox(): Promise<void> {
    try {
      if (!this._type || !this._parentId) {
        throw new Error('No create type or parentId found');
      }

      const newBox = this._db.save({
        type: this._type,
        parentId: this._parentId,
        imageBg: getRandomColor(),
        name: this._name.value.trim(),
        createdAt: new Date(),
        ...(this._photo && {
          aspectRatio: this._photo.width / this._photo.height,
          status: ImageUploadStatus.IN_PROGRESS,
        }),
      });

      if (this._photo) {
        const { key } = await uploadImage(this._photo.uri);

        this._db.update(newBox, {
          key,
          status: ImageUploadStatus.DONE,
        });
      }

      this._navigation.goBack();
    } catch (err) {
      logger.error(err);
    }
  }

  openGallery(): void {
    this._gallery.open({
      selectAsset: this.selectAsset,
    });
  }

  removePhoto(): void {
    this._photo = null;
  }

  private async selectAsset(asset: Asset): Promise<void> {
    runInAction(() => (this._photo = asset));
  }
}
