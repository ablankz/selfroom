// @mui
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// components
import Iconify from '@/components/iconify';
import { useGetInUsersQuery } from '@/api/room-visits/useGetInUsersQuery';
import { SimpleChatRoom } from '@/types/entity';
import { ListItemText, Skeleton } from '@mui/material';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';

// ----------------------------------------------------------------------

type Props = {
  chatRoom: SimpleChatRoom;
};

export default function ChatHeaderDetail({ chatRoom }: Props) {
  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 100, sm: 200, md: 400 } }}
            height={60}
          />
        }
      >
        <UserList chatRoom={chatRoom} />
      </Suspense>
      <Stack flexGrow={1} />

      <IconButton>
        <Iconify icon="solar:phone-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="solar:videocamera-record-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </>
  );
}

const UserList = ({ chatRoom }: Props) => {
  const { data, refetch } = useGetInUsersQuery(chatRoom.chatRoomId, 1, 5);
  const { t } = useLocales();

  if (!data) {
    return <Navigate to={paths.error.server} replace />;
  }

  const group = data.data.totalCount > 1;

  const singleUser = data.data.data[0];

  const renderGroup = (
    <AvatarGroup
      max={data.data.totalCount < 2 ? undefined : data.data.totalCount}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 32,
          height: 32,
        },
      }}
    >
      {data.data.data.map((user) => (
        <Avatar
          key={user.userId}
          alt={user.nickname}
          src={user.profilePhotoUrl || undefined}
        />
      ))}
    </AvatarGroup>
  );

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      <Avatar
        src={singleUser.profilePhotoUrl || undefined}
        alt={singleUser.nickname}
      />

      <ListItemText
        primary={singleUser.nickname}
        secondary={singleUser.userId}
        secondaryTypographyProps={{
          component: 'span',
        }}
      />
    </Stack>
  );
  return <>{group ? renderGroup : renderSingle}</>;
};
