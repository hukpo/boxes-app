import { autoInjectable } from 'tsyringe';

import { BoxesDb } from '../../db';
import { Navigation } from '@/navigation';
import { Box, BoxObject } from '../../types';
import { makeSimpleAutoObservable } from '@/stores';
import { BoxesManageScreen } from '../../navigation';

@autoInjectable()
export class InfoVm {
  private _parent: BoxObject | null = null;

  constructor(private _db?: BoxesDb, private _navigation?: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get parent(): BoxObject | null {
    return this._parent;
  }
  setParent(parentId: Box['parentId']): void {
    const parent = this._db!.getById(parentId);

    if (parent) {
      this._parent = parent;
    }
  }

  openEditScreen(): void {
    if (this._parent) {
      this._navigation!.navigate(BoxesManageScreen.EDIT, { boxId: this._parent._id });
    }
  }
}
