import {
  MotionViewport,
  varTranEnter,
  varTranExit,
} from '@/components/animate';
import { Typography } from '@mui/material';
import { Fragment } from 'react';
import { m } from 'framer-motion';
import { useLocales } from '@/locales';

type Props = {
  description: string;
};

export const SkillDescription = ({ description }: Props) => {
  const { currentLang } = useLocales();
  return (
    <MotionViewport disableAnimatedMobile={false}>
      {description
        .split('\n')
        .map((e, i) => (
          <Fragment key={i.toString() + currentLang.value}>
            <Typography
              component={m.div}
              variant="body2"
              display="inline"
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
              {e}
            </Typography>
            <br />
          </Fragment>
        ))}
    </MotionViewport>
  );
};
