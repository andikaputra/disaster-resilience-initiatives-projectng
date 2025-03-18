import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Overlay,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';

const VrSimulatorHero: React.FC<ProductStoreDownloadProps | undefined> = (props) => {
  const matchesHeight = useMatches({
    base: 200,
    md: 500,
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
        style={{
          objectFit: 'cover',
        }}
        objectPosition="top"
      />
    </Box>
  );
};

const VrSimulatorStore: React.FC<ProductStoreDownloadProps | undefined> = (props) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  const matchesObjectPosition = useMatches({ base: 'bottom', md: 'center' });
  const matchesObjectPositionStoreImage = useMatches({ base: '0px -150px', md: 'center' });
  return (
    <Link
      href={props?.downloadBanner?.downloadPath ?? '#'}
      target="_blank"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 200,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <Image
          src={props?.downloadBanner?.image ?? '/images/vr-simulator-store.png'}
          fill
          style={{
            zIndex: -1,
            transition: 'all 0.5s ease',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.1)' : 'scale(1.2)',
            objectPosition: matchesObjectPositionStoreImage,
          }}
          alt="vr simulattor hero"
          objectPosition={matchesObjectPosition}
        />
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Box
            style={{
              position: 'relative',
              transition: 'all 0.5s ease',
              borderRadius: 10,
              overflow: 'hidden',
            }}
            p={theme.spacing.lg}
          >
            <Overlay color="#000" backgroundOpacity={0.3} blur={5} style={{ zIndex: -1 }} />
            <Flex direction="column" justify="center" align="center">
              {props?.downloadBanner?.downloadLogo ?? <IoLogoGooglePlaystore size={50} />}
              <Title style={{ fontSize: hovered ? 25 : 20, transition: 'all 0.5s ease' }} order={4}>
                {props?.downloadBanner?.downloadTitle ?? 'DOWNLOAD'}
              </Title>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

type ProductStoreDownloadProps = {
  downloadBanner?: {
    image?: string;
    downloadPath?: string;
    downloadTitle?: string;
    downloadLogo?: ReactNode;
  };
  decorationBanner?: {
    image?: string;
  };
};

export default function ProductStoreDownload(props?: ProductStoreDownloadProps) {
  const theme = useMantineTheme();
  return (
    <>
      <Container size="xl">
        <Box mx={theme.spacing.md}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 9 }} order={{ base: 2, md: 1 }}>
              <VrSimulatorHero decorationBanner={props?.decorationBanner} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }} order={{ base: 1, md: 2 }}>
              <VrSimulatorStore {...props} />
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
