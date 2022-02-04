import { ChatMessageBase, ChatMessageType } from './base';

export enum ChatMessageImageUploadStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export type ChatMessageImage = ChatMessageBase<ChatMessageType.IMAGE> & {
  key?: string;
  aspectRatio: number;
  status: ChatMessageImageUploadStatus;
};
