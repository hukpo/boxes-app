import { runInAction } from 'mobx';
import { Alert } from 'react-native';
import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { BoxesDb } from '../../db';
import { Navigation } from '@/navigation';
import { SwipableRowsManager } from '@/hooks';
import { makeSimpleAutoObservable } from '@/stores';
import { Boxes, BoxObject, BoxType } from '../../types';
import { BoxesMainScreen, ChatMainScreen } from '@/modules';

@autoInjectable()
export class BoxListRowVm {
  private _previewBoxes: Boxes | null = null;

  constructor(
    private _box: BoxObject,
    private _db: BoxesDb,
    private _navigation: Navigation,
    private _rowsManager: SwipableRowsManager,
  ) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });

    this.getPreviewBoxes();
  }

  get previewBoxes(): Boxes | null {
    return this._previewBoxes;
  }

  async getPreviewBoxes(): Promise<void> {
    try {
      const boxes = this._db.getByParentId(this._box._id);

      runInAction(() => (this._previewBoxes = boxes));
    } catch (err) {
      logger.error(err);
    }
  }

  openBox(box = this._box): void {
    switch (box.type) {
      case BoxType.FOLDER:
        return this._navigation.push(BoxesMainScreen.LIST, { parentId: box._id, parentName: box.name });

      case BoxType.CHAT:
        return this._navigation.navigate(ChatMainScreen.MAIN, { parentId: box._id, parentName: box.name });
    }
  }

  deleteBox(): void {
    this._rowsManager.closeAll();

    Alert.alert(`Are you sure you want to delete ${this._box.name}?`, undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          // TODO loader
          // TODO delete images
          this._db.delete(this._box);
        },
      },
    ]);
  }
}
