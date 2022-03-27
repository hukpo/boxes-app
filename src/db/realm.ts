import Realm from 'realm';
import { v4 as uuidv4 } from 'uuid';
import { singleton } from 'tsyringe';
import auth from '@react-native-firebase/auth';

import { config } from '@/config';
import { logger } from '@/helpers';
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
  private _realmApp = new Realm.App({
    id: config.REALM_ID,
    baseUrl: config.REALM_BASE_URL,
  });

  async init(): Promise<void> {
    logger.info('Trying to init database');

    let user: Realm.User<Realm.DefaultFunctionsFactory, Record<string, unknown>, Realm.DefaultUserProfileData>;

    if (this._realmApp.currentUser) {
      logger.info('Got existing user');

      user = this._realmApp.currentUser;
    } else {
      logger.info('Trying get user credentials');

      const { currentUser } = auth();

      if (!currentUser) {
        throw new Error('No current user found');
      }

      const idToken = await currentUser.getIdToken();

      logger.info('Trying to login realm user');

      user = await this._realmApp.logIn(Realm.Credentials.jwt(idToken));
    }

    logger.info(`Trying to open database with userId: ${user.id}`);

    this._realm = await Realm.open({
      sync: {
        user,
        partitionValue: user.id,
        existingRealmFileBehavior: {
          type: 'downloadBeforeOpen' as Realm.OpenRealmBehaviorType.DownloadBeforeOpen,
        },
      },
      schemaVersion: 3,
      schema: [boxSchema, chatMessageSchema],
    });

    logger.info('Database initialized');
  }

  objects<T>(modelName: string): Realm.Results<T & Realm.Object> {
    return this._realm.objects<T>(modelName);
  }

  get<T>(modelName: string, id: string): (T & Realm.Object) | undefined {
    return this._realm.objectForPrimaryKey(modelName, id);
  }

  create<T extends Model>(collectionName: string, obj: Omit<T, '_id'>): T & Realm.Object {
    return this._realm.write(() => {
      const result = this._realm.create(collectionName, {
        ...obj,
        _id: uuidv4(),
      } as T);

      return result as typeof result & T;
    });
  }

  update<T extends Model>(object: T, updateObj: Partial<T>): void {
    this._realm.write(() => {
      for (const key in updateObj) {
        object[key] = updateObj[key]!;
      }
    });
  }

  delete<K extends ModelObject | ModelObject[] | Realm.List<ModelObject> | Realm.Results<ModelObject>>(obj: K): void {
    this._realm.write(() => {
      this._realm.delete(obj);
    });
  }
}
