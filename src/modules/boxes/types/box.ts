import Realm from 'realm';

import { ImageUploadStatus } from '@/types';

export enum BoxType {
  FOLDER = 'FOLDER',
  CHAT = 'CHAT',
}

export type Box = {
  _id: string;
  type: BoxType;
  name: string;
  imageBg: string;
  key?: string;
  aspectRatio?: number;
  status?: ImageUploadStatus;
  parentId: string;
  createdAt: Date;
};

export type BoxObject = Box & Realm.Object;

export type Boxes = Realm.Results<BoxObject>;
