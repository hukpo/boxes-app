import Realm from 'realm';

import { ChatMessageText } from './text';
import { ChatMessageToDo } from './to-do';
import { ChatMessageImage } from './image';

export type ChatMessage = ChatMessageText | ChatMessageImage | ChatMessageToDo;

export type ChatMessageObject<T = ChatMessage> = T & Realm.Object;

export type ChatMessages = Realm.Results<ChatMessageObject>;
