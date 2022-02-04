import { autoInjectable } from 'tsyringe';

import { MessagesStore } from '../../stores';
import { makeSimpleAutoObservable } from '@stores';
import { ChatMessageImage, ChatMessageObject } from '../../models';

@autoInjectable()
export class MessageTextVm {
  constructor(private _message: ChatMessageObject<ChatMessageImage>, private _messagesStore: MessagesStore) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get popumMenuActions(): { delete: () => void } {
    return {
      delete: () => this._messagesStore.deleteMessage(this._message),
    };
  }
}
