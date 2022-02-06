import { Linking } from 'react-native';
import { makeAutoObservable } from 'mobx';

import { ChatMessageText } from '../../models';

type TextChunk =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'uri';
      text: string;
      onPress: () => void;
    };

export class MessageTextVm {
  constructor(private _message: ChatMessageText) {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get textChunks(): TextChunk[] {
    const urlRegex = new RegExp(
      '((?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?)',
      'gi',
    );

    return this._message.text.split(urlRegex).reduce<TextChunk[]>((chunks, chunk) => {
      if (!chunk) {
        return chunks;
      }

      if (urlRegex.test(chunk)) {
        chunks.push({ type: 'uri', text: chunk, onPress: () => this.onUriPress(chunk) });
      } else {
        chunks.push({ type: 'text', text: chunk });
      }

      return chunks;
    }, []);
  }

  private onUriPress(uri: string): void {
    Linking.openURL(uri).catch();
  }
}
