import { ChatMessageBase, ChatMessageType } from './base';

export type ChatMessageText = ChatMessageBase<ChatMessageType.TEXT> & {
  text: string;
};
