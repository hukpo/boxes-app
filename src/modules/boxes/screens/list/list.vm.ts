import { runInAction, when } from 'mobx';
import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { BoxesDB } from '../../db';
import { Navigation } from '@/navigation';
import { BoxesCreateScreen } from '@/modules';
import { Box, Boxes, BoxType } from '../../models';
import { AppStore, makeSimpleAutoObservable } from '@/stores';

@autoInjectable()
export class ListVm {
  private _ROOT_PARENT_ID = '*';

  private _boxes: Boxes | null = null;
  private _parentId: Box['parentId'] = this._ROOT_PARENT_ID;

  constructor(private _appStore: AppStore, private _db: BoxesDB, private _navigation: Navigation) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get boxes(): Boxes | null {
    return this._boxes;
  }

  setParentId(value: Box['parentId']): void {
    this._parentId = value;
  }

  async getBoxes(): Promise<void> {
    try {
      if (this._boxes) {
        return;
      }

      // Boxes screen is main so this function can be called before database initialization
      await when(() => this._appStore.isLoaded);

      if (!this._appStore.isAuthorized) {
        return;
      }

      logger.info(`Trying to get Boxes, parentId: ${this._parentId}`);

      const boxes = this._db.getByParentId(this._parentId);

      runInAction(() => (this._boxes = boxes));
    } catch (err) {
      logger.error(err);
    }
  }

  createFolder(): void {
    this._navigation.navigate(BoxesCreateScreen.MAIN, {
      type: BoxType.FOLDER,
      parentId: this._parentId,
    });
  }

  createChat(): void {
    this._navigation.navigate(BoxesCreateScreen.MAIN, {
      type: BoxType.CHAT,
      parentId: this._parentId,
    });
  }
}
