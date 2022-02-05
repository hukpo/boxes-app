import { container } from 'tsyringe';
import { useTranslation } from 'react-i18next';

import { UIStore } from '@/stores';
import { getHHMM } from '@/helpers';
import { PopupMenuItem } from '@/ui-kit';
import { MessagesStore } from '../stores';
import { ChatMessageObject } from '../models';

export const useMessageDefaults = (message: ChatMessageObject): { popupMenuItems: PopupMenuItem[]; time: string } => {
  const { t } = useTranslation(['chat']);
  const uiStore = container.resolve(UIStore);
  const messagesStore = container.resolve(MessagesStore);

  const popupMenuItems: PopupMenuItem[] = [
    {
      title: t('delete'),
      destructive: true,
      systemIcon: { name: 'trash' },
      onPress: () => messagesStore.delete(message),
    },
  ];

  return {
    popupMenuItems,
    time: getHHMM(message.createdAt, uiStore.is24HourClock),
  };
};
