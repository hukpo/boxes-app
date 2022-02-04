import Realm from 'realm';

import { ChatMessageText } from './text';
import { ChatMessageImage } from './image';

export type ChatMessage = ChatMessageText | ChatMessageImage;

export type ChatMessageObject<T = ChatMessage> = T & Realm.Object;

export type ChatMessages = Realm.Results<ChatMessageObject>;
