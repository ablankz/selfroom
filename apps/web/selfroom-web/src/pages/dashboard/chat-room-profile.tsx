import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ChatRoomProfileView } from '@/sections/dashboard/chat-room/view';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from '@/routes/hooks';
import { LoadingScreen } from '@/components/loading-screen';

// ----------------------------------------------------------------------

export default function ChatRoomProfilePage() {
  const { t } = useLocales();
  const [chatRoomId, setUserId] = useState<string | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    id && setUserId(id);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>
          {t('Application')}: {t('ChatRoomProfile')}
        </title>
      </Helmet>

      {chatRoomId ? (
        <Suspense fallback={<LoadingScreen />}>
          <ChatRoomProfileView chatRoomId={chatRoomId} key={chatRoomId} />
        </Suspense>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
