import { ObjectSchema } from 'realm';

export const boxSchema: ObjectSchema = {
  name: 'Box',
  properties: {
    _id: 'string',
    name: 'string',
    type: 'string',
    imageBg: 'string',
    parentId: { type: 'string', indexed: true },
    createdAt: 'date',
  },
  primaryKey: '_id',
};
