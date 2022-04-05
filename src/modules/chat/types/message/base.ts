export enum ChatMessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  TO_DO = 'TO_DO',
}

export type ChatMessageBase<T extends ChatMessageType> = {
  type: T;
  _id: string;
  parentId: string;
  createdAt: Date;
};
