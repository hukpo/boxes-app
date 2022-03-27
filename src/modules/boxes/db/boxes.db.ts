import { autoInjectable, singleton } from 'tsyringe';

import { MessagesDb } from '../../chat';
import { CollectionName, RealmDb } from '@/db';
import { Box, Boxes, BoxObject, BoxType } from '../types';

@singleton()
@autoInjectable()
export class BoxesDb {
  constructor(private _realmDB: RealmDb, private _messagesDB: MessagesDb) {}

  getById(id: Box['_id']): BoxObject | undefined {
    return this._realmDB.get(CollectionName.BOX, id);
  }

  getByParentId(parentId: Box['parentId']): Boxes {
    return this._realmDB
      .objects<Box>(CollectionName.BOX)
      .filtered('parentId == $0', parentId)
      .sorted('createdAt', true);
  }

  save(box: Omit<Box, '_id'>): BoxObject {
    return this._realmDB.create(CollectionName.BOX, box);
  }

  update<T extends BoxObject>(box: T, updateObj: Partial<T>): void {
    this._realmDB.update(box, updateObj);
  }

  delete(box: BoxObject): void {
    if (box.type === BoxType.CHAT) {
      this._messagesDB.deleteByParentId(box._id);
    } else {
      this.getByParentId(box._id).forEach(child => this.delete(child));
    }

    this._realmDB.delete(box);
  }
}
