import { when } from 'mobx';
import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { BoxesDb } from '../../db';
import { Navigation } from '@/navigation';
import { BoxesCreateScreen } from '@/modules';
import { Box, Boxes, BoxObject, BoxType } from '../../types';
import { AppStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class ListVm {
  private _ROOT_PARENT_ID = '*';

  private _boxes: Boxes | null = null;
  private _parent: BoxObject | null = null;

  constructor(
    private _appStore?: AppStore,
    private _db?: BoxesDb,
    private _navigation?: Navigation,
  ) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get boxes(): Boxes | null {
    return this._boxes;
  }
  setBoxes(value: Boxes): void {
    this._boxes = value;
  }

  get parentId(): string {
    if (!this._parent) {
      return this._ROOT_PARENT_ID;
    }

    return this._parent._id;
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

  async getBoxes(): Promise<void> {
    try {
      if (this._boxes) {
        return;
      }

      // Boxes screen is main so this function can be called before database initialization
      await when(() => this._appStore!.isLoaded);

      if (!this._appStore!.isAuthorized) {
        return;
      }

      logger.info(`Trying to get Boxes, parentId: ${this.parentId}`);

      const boxes = this._db!.getByParentId(this.parentId);

      this.setBoxes(boxes);
    } catch (err) {
      logger.error(err);
    }
  }

  createFolder(): void {
    this._navigation!.navigate(BoxesCreateScreen.MAIN, {
      type: BoxType.FOLDER,
      parentId: this.parentId,
    });
  }

  createChat(): void {
    this._navigation!.navigate(BoxesCreateScreen.MAIN, {
      type: BoxType.CHAT,
      parentId: this.parentId,
    });
  }
}
