import { singleton } from 'tsyringe';

import { CollectionName, RealmDB } from '@/db';
import { ChatMessage, ChatMessages, ChatMessageObject } from '../models';

@singleton()
export class MessagesDB {
  constructor(private _realmDB: RealmDB) {}

  async getByParentId(parentId: ChatMessage['parentId']): Promise<ChatMessages> {
    return this._realmDB
      .objects<ChatMessage>(CollectionName.MESSAGE)
      .filtered('parentId == $0', parentId)
      .sorted('createdAt', true);
  }

  async save<T extends ChatMessage>(message: Omit<T, '_id'>): Promise<ChatMessageObject<T>> {
    return this._realmDB.create(CollectionName.MESSAGE, message);
  }

  async update<T extends ChatMessageObject>(message: T, updateObj: Partial<T>): Promise<void> {
    await this._realmDB.update(message, updateObj);
  }

  async delete<T extends ChatMessageObject>(message: T): Promise<void> {
    await this._realmDB.delete(message);
  }

  async deleteByParentId(parentId: ChatMessage['parentId']): Promise<void> {
    const messages = await this.getByParentId(parentId);

    await this._realmDB.delete(messages);
  }
}
