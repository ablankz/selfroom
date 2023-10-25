// @mui
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// components
import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
//
import { ApplicationPaginateData } from '@/types/response/application-paginate-data';
import { ChatRoomUserData } from '@/types/response/chat-room/chat-room-users-response';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  data: ApplicationPaginateData<ChatRoomUserData>;
};

export default function ChatRoomGroup({ data }: Props) {
  const router = useRouter();
  const collapse = useBoolean(true);

  const renderBtn = (
    <ListItemButton
      onClick={collapse.onToggle}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: 40,
        flexShrink: 0,
        flexGrow: 'unset',
        typography: 'overline',
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Box component="span" sx={{ flexGrow: 1 }}>
        In room ({data.totalCount})
      </Box>
      <Iconify
        width={16}
        icon={
          collapse.value
            ? 'eva:arrow-ios-downward-fill'
            : 'eva:arrow-ios-forward-fill'
        }
      />
    </ListItemButton>
  );

  const renderContent = (
    <Scrollbar sx={{ height: 56 * 4 }}>
      {data.data.map((user) => (
        <ListItemButton
          key={user.userId}
          onClick={() => router.push(paths.dashboard.profile(user.userId))}
        >
          <Avatar alt={user.nickname} src={user.profilePhotoUrl || undefined} />

          <ListItemText
            sx={{ ml: 2 }}
            primary={user.nickname}
            secondary={user.userId}
            primaryTypographyProps={{
              noWrap: true,
              typography: 'subtitle2',
            }}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              typography: 'caption',
            }}
          />
        </ListItemButton>
      ))}
    </Scrollbar>
  );

  return (
    <>
      {renderBtn}

      <div>
        <Collapse in={collapse.value}>{renderContent}</Collapse>
      </div>
    </>
  );
}
