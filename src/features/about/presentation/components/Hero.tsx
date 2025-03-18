import React from 'react';
import Image from 'next/image';
import { Box, Container, Flex, Grid, Space, useMantineTheme, useMatches } from '@mantine/core';
import { usePageProps } from '@/src/shared/presentations/contexts';
import type { AboutPageServerSideProps } from '../../domain/types';

const Frame: React.FC = () => {
  const matchesIFrameHeight = useMatches({
    base: '100%',
    md: undefined,
  });
  return (
    <Flex
      direction="column"
      style={{
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'black',
        minHeight: 300,
        overflow: 'hidden',
      }}
      justify="center"
    >
      <iframe
        width="100%"
        height={matchesIFrameHeight}
        src="https://www.youtube.com/embed/PTjeVEk0eeQ?si=Q2LKeaVSrC0ydaof"
        title="YouTube video player"
        style={{ border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </Flex>
  );
};

const VrSimulatorHero: React.FC<ProductStoreDownloadProps | undefined> = (props) => {
  const matchesHeight = useMatches({
    base: 200,
    md: 300,
  });
  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        minHeight: matchesHeight,
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <Image
        src={props?.decorationBanner?.image ?? '/images/vr-simulator-hero.png'}
        fill
        alt="vr simulattor hero"
        style={{ objectFit: 'cover' }}
        objectPosition="top"
      />
    </Box>
  );
};

type ProductStoreDownloadProps = {
  downloadBanner?: {
    image?: string;
    downloadPath?: string;
    downloadTitle?: string;
  };
  decorationBanner?: {
    image?: string;
  };
};

export default function ProductStoreDownload(props?: ProductStoreDownloadProps) {
  const theme = useMantineTheme();
  const data = usePageProps<AboutPageServerSideProps>();
  return (
    <>
      <Container size="xl">
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Box mx={theme.spacing.md}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <VrSimulatorHero />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Frame />
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
