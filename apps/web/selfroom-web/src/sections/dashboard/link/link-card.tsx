import ScrollProgress from '@/components/scroll-progress';
import TextMaxLine from '@/components/text-max-line';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Link = {
  id: number;
  title: string;
  description: string;
  link: string;
  svg: string;
};

type Props = {
  items: Link[];
};

type State = {
  links: Link[];
  mount: boolean;
};

export const LinkCard = ({ items }: Props) => {
  const handleClick = (item: Link) => {
    window.open(item.link, '_blank');
  };

  const [state, setState] = useState<State>({
    links: items,
    mount: false,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollContainer = useScroll({ container: containerRef });

  useEffect(() => {
    if (!state.mount)
      if (items.length % 2)
        setState((prev) => ({
          links: [
            ...prev.links,
            {
              id: items.length,
              title: '',
              description: '',
              link: '',
              svg: '',
            },
          ],
          mount: true,
        }));
      else
        setState((prev) => ({
          ...prev,
          mount: true,
        }));
  }, [state.links]);

  const isEmptyLink = (link: Link): boolean => !link.title;

  return (
    <Card
      sx={{
        bgcolor: alpha('#ffffff', 0),
        boxShadow: (theme) => theme.customShadows.info,
      }}
    >
      <ScrollProgress
        scrollYProgress={scrollContainer.scrollYProgress}
        color="error"
        sx={{ position: 'unset', height: 6 }}
      />
      <CardContent
        ref={containerRef}
        sx={{
          height: {
            xs: '70vh',
            md: '60vh',
          },
          overflow: 'scroll',
        }}
        className="scrollbar-none"
      >
        <Box
          display='flex'
          justifyContent='center'
          sx={{
            px: {
              xs: 3,
              lg: 8,
            },
            py: {
              xs: 3,
              lg: 6,
            },
          }}
        >
          <Grid
            container
            spacing={{ xs: 4, md: 20, lg: 16 }}
            alignItems="center"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            justifyContent="center"
          >
            {!state.links.length ? (
              <></>
            ) : (
              state.links.map((e) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={8}
                  xl={5}
                  key={e.id}
                  sx={{
                    ...(isEmptyLink(e) && {
                      display: {
                        xs: 'none',
                        md: 'block',
                        lg: 'none',
                        xl: 'block',
                      },
                    }),
                  }}
                >
                  {isEmptyLink(e) ? <></> : (
                    <Card
                      className="hover-scale hover-scale-sm"
                      sx={{
                        boxShadow: (theme) => theme.customShadows.primary,
                      }}
                    >
                      <Tooltip title={e.description}>
                        <CardActionArea onClick={() => handleClick(e)}>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                            sx={{ p: 3 }}
                          >
                            <Stack spacing={1} sx={{ flexGrow: 1 }}>
                              <Typography
                                color="text.secondary"
                                component={TextMaxLine}
                                line={1}
                              >
                                {e.description}
                              </Typography>
                              <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                              >
                                <Typography variant="h5">{e.title}</Typography>
                              </Stack>
                            </Stack>
                            <Box
                              component="span"
                              className="svg-color"
                              sx={{
                                width: 48,
                                height: 48,
                                minWidth: 48,
                                minHeight: 48,
                                display: 'inline-block',
                                bgcolor: (theme) => theme.palette.primary.main,
                                mask: `url(/assets/icons/link/${e.svg}.svg) no-repeat center / contain`,
                                WebkitMask: `url(/assets/icons/link/${e.svg}.svg) no-repeat center / contain`,
                              }}
                            ></Box>
                          </Stack>
                        </CardActionArea>
                      </Tooltip>
                    </Card>
                  )}
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
