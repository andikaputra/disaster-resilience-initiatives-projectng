import { use, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { IconMapPinFilled } from '@tabler/icons-react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Space,
  Text,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useLandingPageContext } from '../contexts';

export default function Hero() {
  const theme = useMantineTheme();
  const router = useRouter();
  const searchParam = useSearchParams().get('section');
  const { simulationPlacesRef } = useLandingPageContext();
  const isLargeDevice = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const titleFontSize = useMatches({
    base: 50,
    sm: 55,
    md: 60,
    lg: 65,
    xl: 70,
  });
  const marginRoot = useMatches({
    base: 20,
    lg: 60,
  });
  useEffect(() => {
    if (searchParam === 'implementation') {
      router.replace('/', undefined, { shallow: true });
      simulationPlacesRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [searchParam, simulationPlacesRef]);
  return (
    <Box>
      <Grid mx={marginRoot} my={76}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title
            order={1}
            style={{ fontWeight: 'bolder', fontSize: titleFontSize, color: 'white' }}
          >
            Tangguh Cerdas <br />
            Tanggap Bencana
          </Title>
          <Space h={30} />
          <Text style={{ color: 'white' }}>#teknologisiagabencana</Text>
          <Button
            rightSection={<IconMapPinFilled stroke={2} />}
            variant="outline"
            onClick={() =>
              simulationPlacesRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            color={theme.colors.yellow[6]}
            style={{
              marginTop: 20,
              color: theme.colors.gray[0],
              borderRadius: 100,
              fontWeight: 'normal',
            }}
            h={50}
            py={10}
          >
            Explore Sekarang
            <Space w="xl" />
            <Space w="md" />
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }} style={{ minHeight: isLargeDevice ? undefined : 300 }}>
          <Flex style={{ position: 'relative' }} h="100%" w="100%" justify="end" align="center">
            <Box style={{ backgroundColor: 'red' }}>
              <Image
                src="/images/hero-vr-image.png"
                alt="logo"
                fill
                style={{ borderRadius: '30px', objectFit: 'contain' }}
              />
            </Box>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
