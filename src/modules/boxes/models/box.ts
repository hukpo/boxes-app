import Realm from 'realm';

export enum BoxType {
  FOLDER = 'FOLDER',
  CHAT = 'CHAT',
}

export type Box = {
  _id: string;
  type: BoxType;
  name: string;
  imageBg: string;
  parentId: string;
  createdAt: Date;
};

export type BoxObject = Box & Realm.Object;

export type Boxes = Realm.Results<BoxObject>;
