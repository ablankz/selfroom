// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// components
import Iconify from '@/components/iconify';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { RoomSort as SortType } from '@/api/chat-rooms/useGetChatRoomsQuery';
import { Dispatch, SetStateAction } from 'react';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

type Props = {
  sort: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
};

type Select = {
  value: SortType;
  label: string;
};

const SORT_SELECT: Select[] = [
  {
    value: 'latest',
    label: 'Latest',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'favors',
    label: 'Favors',
  },
  {
    value: 'users',
    label: 'Users',
  },
];

export default function RoomSort({ sort, setSort }: Props) {
  const popover = usePopover();
  const { t } = useLocales();

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={
              popover.open
                ? 'eva:arrow-ios-upward-fill'
                : 'eva:arrow-ios-downward-fill'
            }
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold' }}
      >
        {t('Sort By')}:
        <Box
          component="span"
          sx={{
            ml: 0.5,
            fontWeight: 'fontWeightBold',
            textTransform: 'capitalize',
          }}
        >
          {t(`${SORT_SELECT.find((e) => e.value === sort)?.label || ''}-sort`)}
        </Box>
      </Button>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 140 }}
      >
        {SORT_SELECT.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => {
              popover.onClose();
              setSort(option.value);
            }}
          >
            {t(`${option.label}-sort`)}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
