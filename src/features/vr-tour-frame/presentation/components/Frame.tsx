import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Center, useMantineTheme, useMatches } from '@mantine/core';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { useVrTourFramePageContext } from '../contexts';

export default function Frame() {
  const villageSlug = useRouter().asPath.split('/').at(-2);
  const markerId = useRouter().asPath.split('/').at(-1);
  const theme = useMantineTheme();
  const matchesPx = useMatches({
    base: undefined,
    md: theme.spacing.md,
  });
  const { data } = usePageProps<Simulation360Entity>();
  const iframeLink = useMemo(() => {
    const village = data?.village?.find((item) => item.slug === villageSlug);
    const marker = village?.mapbox_collection?.find((item) => item.id === markerId);
    return marker?.vr_url;
  }, [data]);
  return (
    <>
      <Center style={{ width: '100%' }} px={matchesPx}>
        <iframe
          width="100%"
          style={{
            height: '100%',
            width: '100%',
            maxHeight: '90dvh',
            minHeight: '90dvh',
            border: 'none',
          }}
          src={iframeLink}
          title={process.env.NEXT_PUBLIC_APP_AUTHOR}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Center>
    </>
  );
}
