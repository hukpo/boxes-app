import { runInAction } from 'mobx';
import { autoInjectable } from 'tsyringe';

import { logger } from '@/helpers';
import { MessagesDb } from '../../db';
import { ChatMessages } from '../../types';
import { makeSimpleAutoObservable } from '@/stores';
import { BoxesDb, BoxObject, Box } from '@/modules';

@autoInjectable()
export class MainVm {
  private _parent: BoxObject | null = null;
  private _messages: ChatMessages | null = null;

  constructor(private _db?: MessagesDb, private _boxesDb?: BoxesDb) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get messages(): ChatMessages | null {
    return this._messages;
  }

  get parentId(): string | null {
    if (!this._parent) {
      return null;
    }

    return this._parent._id;
  }

  get parent(): BoxObject | null {
    return this._parent;
  }
  setParent(parentId: Box['parentId']): void {
    const parent = this._boxesDb!.getById(parentId);

    if (parent) {
      this._parent = parent;
    }
  }

  async getMessages(): Promise<void> {
    try {
      if (!this.parentId) {
        throw new Error('No parentId found');
      }

      logger.info(`Trying to get Messages, parentId: ${this.parentId}`);

      const messages = this._db!.getByParentId(this.parentId);

      runInAction(() => (this._messages = messages));
    } catch (err) {
      logger.error(err);
    }
  }
}
