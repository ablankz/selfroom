import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ChatRoomCreateView } from '@/sections/dashboard/chat-room/view';

// ----------------------------------------------------------------------

export default function ChatRoomCreatePage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title>
          {t('Application')}: {t('ChatRoomCreate')}
        </title>
      </Helmet>

      <ChatRoomCreateView />
    </>
  );
}
