import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ChatRoomProfileView } from '@/sections/dashboard/chat-room/view';

// ----------------------------------------------------------------------

export default function ChatRoomProfilePage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Application')}: {t('ChatRoomProfile')}</title>
      </Helmet>

      <ChatRoomProfileView />
    </>
  );
}
