import { container } from 'tsyringe';
import { useTranslation } from 'react-i18next';

import { PopupMenuItem } from '@/ui-kit';
import { MessagesStore } from '../stores';
import { ChatMessageObject } from '../models';

export const useMessageDefaults = (message: ChatMessageObject): { popupMenuItems: PopupMenuItem[] } => {
  const { t } = useTranslation(['chat']);
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
  };
};
