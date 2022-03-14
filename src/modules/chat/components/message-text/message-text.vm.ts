import { v4 as uuidv4 } from 'uuid';
import { setString } from 'expo-clipboard';
import { autoInjectable } from 'tsyringe';

import { ComposerVm } from '../composer';
import { makeSimpleAutoObservable } from '@/stores';
import { ChatMessageObject, ChatMessageText } from '../../models';

type TextChunk =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'uri';
      text: string;
    };

@autoInjectable()
export class MessageTextVm {
  private _messageText: string | null = null;
  private _message: ChatMessageObject<ChatMessageText> | null = null;

  constructor(private _composerVm: ComposerVm) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
  }

  get textChunks(): TextChunk[] {
    if (!this._messageText) {
      return [];
    }

    const urlRegex =
      /((?!mailto:)(?:(?:http|https|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:(\/|\?|#)[^\s]*)?)/gi;

    const urls: string[] = [];
    const divider = uuidv4();

    const parsedString = this._messageText.replace(urlRegex, result => {
      urls.push(result);

      return divider;
    });

    return parsedString.split(new RegExp(`(${divider})`, 'g')).reduce<TextChunk[]>((chunks, chunk) => {
      if (chunk === divider) {
        const url = urls.shift();

        if (url) {
          chunks.push({ type: 'uri', text: url });
        }
      } else if (chunk) {
        chunks.push({ type: 'text', text: chunk });
      }

      return chunks;
    }, []);
  }

  setMessage(value: ChatMessageObject<ChatMessageText>): void {
    this._message = value;
    this._messageText = value.text;
  }

  copyMessage(): void {
    if (this._messageText) {
      setString(this._messageText);
    }
  }

  editMessage(): void {
    if (this._message) {
      this._composerVm.editMessage(this._message);
    }
  }
}
