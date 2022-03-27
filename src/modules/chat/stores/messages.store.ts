import { autoInjectable, singleton } from 'tsyringe';

import { MessagesDB } from '../db';
import { logger } from '@/helpers';
import { ChatMessageObject } from '../types';
import { makeSimpleAutoObservable } from '@/stores';

@singleton()
@autoInjectable()
export class MessagesStore {
  constructor(private _db: MessagesDB) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  async delete(message: ChatMessageObject): Promise<void> {
    try {
      logger.info(`Trying to delete message with id: ${message._id}, type: ${message.type}`);

      this._db.delete(message);
    } catch (err) {
      logger.error(err);
    }
  }
}
