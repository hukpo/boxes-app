import { runInAction } from 'mobx';
import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { MessagesDB } from '../../db';
import { makeSimpleAutoObservable } from '@/stores';
import { ChatMessage, ChatMessages } from '../../types';

@autoInjectable()
export class MainVm {
  private _messages: ChatMessages | null = null;
  private _parentId: ChatMessage['parentId'] | null = null;

  constructor(private _db: MessagesDB) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get messages(): ChatMessages | null {
    return this._messages;
  }

  setParentId(value: ChatMessage['parentId']): void {
    this._parentId = value;
  }

  async getMessages(): Promise<void> {
    try {
      if (!this._parentId) {
        throw new Error('No parentId found');
      }

      logger.info(`Trying to get Messages, parentId: ${this._parentId}`);

      const messages = this._db.getByParentId(this._parentId);

      runInAction(() => (this._messages = messages));
    } catch (err) {
      logger.error(err);
    }
  }
}
