export enum ChatMessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export type ChatMessageBase<T extends ChatMessageType> = {
  type: T;
  _id: string;
  parentId: string;
  createdAt: Date;
};
