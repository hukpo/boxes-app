import { autoInjectable } from 'tsyringe';

import { BoxesDb } from '../../db';
import { Box, BoxObject } from '../../types';
import { InputStore, PhotoSelectStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class EditVm {
  private _name = new InputStore();
  private _photo = new PhotoSelectStore();
  private _parent: BoxObject | null = null;

  constructor(private _db?: BoxesDb) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get photo(): PhotoSelectStore {
    return this._photo;
  }

  get name(): InputStore {
    return this._name;
  }

  get parent(): BoxObject | null {
    return this._parent;
  }
  setParent(parentId: Box['parentId']): void {
    const parent = this._db?.getById(parentId);

    if (parent) {
      this._parent = parent;
      this._name.setValue(parent.name);
    }
  }

  saveChanged(): void {}
}
