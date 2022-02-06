import { ChatMessageText } from '../../models';
import { makeSimpleAutoObservable } from '@/stores';

type TextChunk =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'uri';
      text: string;
    };

export class MessageTextVm {
  constructor(private _message: ChatMessageText) {
    makeSimpleAutoObservable(this, undefined, { autoBind: true });
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
        chunks.push({ type: 'uri', text: chunk });
      } else {
        chunks.push({ type: 'text', text: chunk });
      }

      return chunks;
    }, []);
  }
}
