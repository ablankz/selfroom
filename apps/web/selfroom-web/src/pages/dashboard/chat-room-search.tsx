import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ChatRoomSearchView } from '@/sections/dashboard/chat-room/view';

// ----------------------------------------------------------------------

export default function ChatRoomSearchPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Application')}: {t('ChatRoomSearch')}</title>
      </Helmet>

      <ChatRoomSearchView />
    </>
  );
}
