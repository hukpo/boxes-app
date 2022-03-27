import { singleton } from 'tsyringe';

import { CollectionName, RealmDB } from '@/db';
import { ChatMessage, ChatMessages, ChatMessageObject } from '../models';

@singleton()
export class MessagesDB {
  constructor(private _realmDB: RealmDB) {}

  getByParentId(parentId: ChatMessage['parentId']): ChatMessages {
    return this._realmDB
      .objects<ChatMessage>(CollectionName.MESSAGE)
      .filtered('parentId == $0', parentId)
      .sorted('createdAt', true);
  }

  save<T extends ChatMessage>(message: Omit<T, '_id' | 'createdAt'>): ChatMessageObject<T> {
    const _message = Object.assign(message, { createdAt: new Date() }) as Omit<T, '_id'>;

    return this._realmDB.create(CollectionName.MESSAGE, _message);
  }

  update<T extends ChatMessageObject>(message: T, updateObj: Partial<T>): void {
    this._realmDB.update(message, updateObj);
  }

  delete<T extends ChatMessageObject>(message: T): void {
    this._realmDB.delete(message);
  }

  deleteByParentId(parentId: ChatMessage['parentId']): void {
    this._realmDB.delete(this.getByParentId(parentId));
  }
}
