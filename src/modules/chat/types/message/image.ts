import { ImageUploadStatus } from '@/types';
import { ChatMessageBase, ChatMessageType } from './base';

export type ChatMessageImage = ChatMessageBase<ChatMessageType.IMAGE> & {
  key?: string;
  aspectRatio: number;
  status: ImageUploadStatus;
};
