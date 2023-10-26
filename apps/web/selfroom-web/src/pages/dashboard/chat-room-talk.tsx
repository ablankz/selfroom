import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ChatRoomTalkView } from '@/sections/dashboard/chat-room/view';

// ----------------------------------------------------------------------

export default function ChatRoomTalkPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Application')}: {t('ChatRoomTalk')}</title>
      </Helmet>

      <ChatRoomTalkView />
    </>
  );
}
