import { runInAction } from 'mobx';
import { Alert } from 'react-native';
import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { BoxesDB } from '../../db';
import { Navigation } from '@/navigation';
import { SwipableRowsManager } from '@/hooks';
import { makeSimpleAutoObservable } from '@/stores';
import { Boxes, BoxObject, BoxType } from '../../models';
import { BoxesMainScreen, ChatMainScreen } from '@/modules';

@autoInjectable()
export class BoxListRowVm {
  private _previewBoxes: Boxes | null = null;

  constructor(
    private _box: BoxObject,
    private _db: BoxesDB,
    private _navigation: Navigation,
    private _rowsManager: SwipableRowsManager,
  ) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });

    this.getPreviewBoxes();
  }

  get previewBoxes(): Boxes | null {
    return this._previewBoxes;
  }

  getImageTitle(name: string): string {
    if (!name) {
      return '';
    }

    return name[0].toUpperCase();
  }

  async getPreviewBoxes(): Promise<void> {
    try {
      const boxes = await this._db.getByParentId(this._box._id);

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
        onPress: async () => {
          try {
            // TODO loader
            await this._db.delete(this._box);
          } catch (err) {
            logger.error(err);
          }
        },
      },
    ]);
  }
}
