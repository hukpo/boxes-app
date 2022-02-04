import { autoInjectable } from 'tsyringe';

import { BoxesDB } from '../../db';
import { Navigation } from '@navigation';
import { Box, BoxType } from '../../models';
import { getRandomColor, logger } from '@helpers';
import { InputStore, makeSimpleAutoObservable } from '@stores';

@autoInjectable()
export class CreateVm {
  private _boxName = new InputStore();

  private _type: BoxType | null = null;
  private _parentId: Box['parentId'] | null = null;

  constructor(private _db: BoxesDB, private _navigation: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get boxName(): InputStore {
    return this._boxName;
  }

  setType(value: BoxType): void {
    this._type = value;
  }

  setParentId(value: Box['parentId']): void {
    this._parentId = value;
  }

  async saveBox(): Promise<void> {
    try {
      if (!this._type || !this._parentId) {
        throw new Error('No create type or parentId found');
      }

      await this._db.save({
        type: this._type,
        parentId: this._parentId,
        imageBg: getRandomColor(),
        name: this._boxName.value.trim(),
        createdAt: new Date(),
      });

      this._navigation.goBack();
    } catch (err) {
      logger.error(err);
    }
  }
}
