import { autoInjectable, singleton } from 'tsyringe';

import { MessagesDB } from '../../chat';
import { CollectionName, RealmDB } from '@db';
import { Box, Boxes, BoxObject, BoxType } from '../models';

@singleton()
@autoInjectable()
export class BoxesDB {
  constructor(private _realmDB: RealmDB, private _messagesDB: MessagesDB) {}

  async getByParentId(parentId: Box['parentId']): Promise<Boxes> {
    return this._realmDB
      .objects<Box>(CollectionName.BOX)
      .filtered('parentId == $0', parentId)
      .sorted('createdAt', true);
  }

  async save(box: Omit<Box, '_id'>): Promise<void> {
    await this._realmDB.create(CollectionName.BOX, box);
  }

  async delete(box: BoxObject): Promise<void> {
    if (box.type === BoxType.CHAT) {
      await this._messagesDB.deleteByParentId(box._id);
    } else {
      const children = await this.getByParentId(box._id);

      await Promise.all(children.map(child => this.delete(child)));
    }

    await this._realmDB.delete(box);
  }
}
