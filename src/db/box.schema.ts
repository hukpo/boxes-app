import { ObjectSchema } from 'realm';

export const boxSchema: ObjectSchema = {
  name: 'Box',
  properties: {
    _id: 'string',
    name: 'string',
    key: 'string?',
    type: 'string',
    imageBg: 'string',
    aspectRatio: 'float?',
    parentId: { type: 'string', indexed: true },
    createdAt: 'date',
  },
  primaryKey: '_id',
};
