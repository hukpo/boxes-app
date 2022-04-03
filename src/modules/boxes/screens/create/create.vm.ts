import { autoInjectable } from 'tsyringe';

import { BoxesDb } from '../../db';
import { Navigation } from '@/navigation';
import { Box, BoxType } from '../../types';
import { ImageUploadStatus } from '@/types';
import { getRandomColor, logger, uploadImage } from '@/helpers';
import { InputStore, PhotoSelectStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class CreateVm {
  private _name = new InputStore();
  private _photo = new PhotoSelectStore();
  private _type: BoxType | null = null;
  private _parentId: Box['parentId'] | null = null;

  constructor(private _db?: BoxesDb, private _navigation?: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get photo(): PhotoSelectStore {
    return this._photo;
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

      const newBox = this._db!.save({
        type: this._type,
        parentId: this._parentId,
        imageBg: getRandomColor(),
        name: this._name.value.trim(),
        createdAt: new Date(),
        ...(this._photo.selected && {
          aspectRatio: this._photo.selected.aspectRatio,
          status: ImageUploadStatus.IN_PROGRESS,
        }),
      });

      if (this._photo.selected && 'uri' in this._photo.selected.source) {
        const { key } = await uploadImage(this._photo.selected.source.uri);

        this._db!.update(newBox, {
          key,
          status: ImageUploadStatus.DONE,
        });
      }

      this._navigation!.goBack();
    } catch (err) {
      logger.error(err);
    }
  }
}
