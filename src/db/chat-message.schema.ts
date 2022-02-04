import { ObjectSchema } from 'realm';

export const chatMessageSchema: ObjectSchema = {
  name: 'ChatMessage',
  properties: {
    _id: 'string',
    type: 'string',
    key: 'string?',
    text: 'string?',
    status: 'string?',
    aspectRatio: 'float?',
    parentId: { type: 'string', indexed: true },
    createdAt: 'date',
  },
  primaryKey: '_id',
};
