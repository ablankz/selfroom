import {
  MotionViewport,
  varFade,
  varTranEnter,
  varTranExit,
} from '@/components/animate';
import { useLocales } from '@/locales';
import { Box, Button, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { useState } from 'react';

type Props = {
  description: string;
};

export const SkillDescription = ({ description }: Props) => {
  const [allDisplay, setAllDisplay] = useState(false);
  const { t } = useLocales();

  const styles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  } as const;

  return (
    <MotionViewport disableAnimatedMobile={false}>
      <Typography
        component={m.div}
        variant="body2"
        display="inline"
        sx={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          ...(!allDisplay && {
            ...styles,
          }),
        }}
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            x: [-720, 24, -12, 4, 0],
            scaleX: [3, 1, 0.98, 0.995, 1],
            opacity: [0, 1, 1, 1, 1],
            transition: varTranEnter({
              durationIn: 1.9,
            }),
          },
          exit: {
            x: [0, 24, -720],
            scaleX: [1, 0.9, 2],
            opacity: [1, 1, 0],
            transition: varTranExit(),
          },
        }}
      >
        {description}
      </Typography>
      <Box display='flex' justifyContent='center' mt={2}>
        <Button
          component={m.div}
          sx={{
            width: {
              xs: 1,
              md: 0.4
            }
          }}
          variants={
            varFade({
              durationIn: 1.9,
            }).in
          }
          onClick={() => setAllDisplay(prev => !prev)}
        >
          {allDisplay ? t('Close') : t('Show all')}
        </Button>
      </Box>
    </MotionViewport>
  );
};
