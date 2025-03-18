import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { FaYoutube } from 'react-icons/fa6';
import { Box, Button, Flex, Grid, Space, Title, useMantineTheme, useMatches } from '@mantine/core';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import { usePageProps } from '@/src/shared/presentations/contexts';

export default function Channels() {
  const villageSlug = useRouter().asPath.split('/').at(-2);
  const markerId = useRouter().asPath.split('/').at(-1);
  const theme = useMantineTheme();
  const matchesFlexChannelJustify = useMatches({
    base: 'center',
    md: 'flex-end',
  });
  const matchesFlexTextJustify: 'center' | 'left' = useMatches({
    base: 'center',
    md: 'left',
  });
  const matchesTitleTextSize = useMatches({ base: 16, xs: 18, md: 30 });
  const { data } = usePageProps<Simulation360Entity>();
  const youtubeChannelLink = useMemo(() => {
    const village = data?.village?.find((item) => item.slug === villageSlug);
    const marker = village?.mapbox_collection?.find((item) => item.id === markerId);
    return marker?.vr_youtube_url;
  }, [data]);
  if (!youtubeChannelLink) return null;
  return (
    <>
      <Box px={theme.spacing.md}>
        <Space h={theme.spacing.xl} />
        <Grid>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Title style={{ textAlign: matchesFlexTextJustify, fontSize: matchesTitleTextSize }}>
              Akses 360 VR Versi Youtube
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Flex justify={matchesFlexChannelJustify}>
              <Button
                variant="filled"
                style={{ minWidth: 200 }}
                color={theme.colors.red[8]}
                onClick={() => window.open(youtubeChannelLink)}
                leftSection={<FaYoutube color="white" size={30} />}
              >
                YOUTUBE
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}
