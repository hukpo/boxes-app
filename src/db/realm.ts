import Realm from 'realm';
import { Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { singleton } from 'tsyringe';

import { config } from '@config';
import { logger } from '@helpers';
import { boxSchema } from './box.schema';
import { chatMessageSchema } from './chat-message.schema';

export const CollectionName = {
  BOX: boxSchema.name,
  MESSAGE: chatMessageSchema.name,
};

type Model = {
  _id: string;
};

type ModelObject = Model & Realm.Object;

@singleton()
export class RealmDB {
  private _realm!: Realm;

  async init(): Promise<void> {
    const realmApp = new Realm.App({
      id: config.REALM_ID,
      baseUrl: config.REALM_BASE_URL,
    });

    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();

    const credentials = Realm.Credentials.jwt(token);

    const user = await realmApp.logIn(credentials);

    this._realm = await Realm.open({
      sync: {
        user,
        partitionValue: user.id,
      },
      schema: [boxSchema, chatMessageSchema],
    });

    logger.info('Database initialized');
  }

  objects<T>(modelName: string): Realm.Results<T & Realm.Object> {
    return this._realm.objects<T>(modelName);
  }

  create<T extends Model>(collectionName: string, obj: Omit<T, '_id'>): Promise<T & Realm.Object> {
    return new Promise((res, rej) => {
      this._realm.write(() => {
        try {
          const result = this._realm.create(collectionName, {
            ...obj,
            _id: uuidv4(),
          } as T);

          res(result as typeof result & T);
        } catch (err) {
          rej(err);
        }
      });
    });
  }

  update<T extends Model>(object: T, updateObj: Partial<T>): Promise<void> {
    return new Promise<void>((res, rej) => {
      this._realm.write(() => {
        try {
          for (const key in updateObj) {
            object[key] = updateObj[key]!;
          }

          res();
        } catch (err) {
          rej(err);
        }
      });
    });
  }

  delete<K extends ModelObject | ModelObject[] | Realm.List<ModelObject> | Realm.Results<ModelObject>>(
    obj: K,
  ): Promise<void> {
    return new Promise((res, rej) => {
      this._realm.write(() => {
        try {
          this._realm.delete(obj);

          res();
        } catch (err) {
          rej(err);
        }
      });
    });
  }
}
