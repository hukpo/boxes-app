import { runInAction, toJS } from 'mobx';
import { autoInjectable } from 'tsyringe';

import { MessagesStore } from '../../stores';
import { makeSimpleAutoObservable } from '@/stores';
import { logger, getS3Image, S3Image } from '@/helpers';
import { ChatMessageImage, ChatMessageObject } from '../../models';

@autoInjectable()
export class MessageImageVm {
  private _image: S3Image | null = null;

  constructor(private _message: ChatMessageObject<ChatMessageImage>, private _messagesStore: MessagesStore) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get image(): S3Image | null {
    return toJS(this._image);
  }

  get popumMenuActions(): { delete: () => void } {
    return {
      delete: () => this._messagesStore.deleteMessage(this._message),
    };
  }

  async getUri(key: string): Promise<void> {
    try {
      const image = await getS3Image(key);

      runInAction(() => (this._image = image));
    } catch (err) {
      logger.error(err);
    }
  }
}
