import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  AspectRatio,
  Box,
  Flex,
  Overlay,
  Text,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { ExistingApp } from '@/src/shared/domain/entities';

const technologyLocalData: { code: string; image: string; description: string }[] = [
  {
    code: 'vr-simulator',
    image: '/images/vr-simulator-hero.png',
    description:
      'Lakukan simulasi tanggap Bencana melalui aplikasi VR yang disediakan. Anda juga dapat berkunjung di pameran yang disediakan.',
  },
  {
    code: 'vr-360-tour',
    image: '/images/360-vr-tour.png',
    description:
      'Coba langsung jalur evakuasi bencana di daerah anda, dengan menggunakan fasilitas 360 Photo & VR Tour.',
  },
  {
    code: 'ar-wayfinder',
    image: '/images/ar-wayfinder.png',
    description:
      'Coba langsung jalur evakuasi bencana di daerah anda, dengan menggunakan fasilitas 360 Photo & VR Tour.',
  },
];

type SimulationTechnologyProps = ExistingApp & {
  onClick?: () => void;
};

export default function SimulationTechnology({
  code,
  display,
  onClick,
}: ExistingApp & { onClick?: () => void }) {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const mathesTitleFontSize = useMatches({ base: 16, xs: 16, md: 18 });
  const mathesDescriptionFontSize = useMatches({ base: 12, xs: 14, md: 14 });
  const matchesMaxSizeAspectRation = useMatches({ base: undefined, md: 400 });
  const matchesAspectRatio = useMatches({ base: 1.5 / 1, xs: 1 / 1 });
  const matchesLocalData = useMemo(
    () => technologyLocalData.find((t) => t.code === code) ?? technologyLocalData.at(0)!,
    [code]
  );
  return (
    <AspectRatio
      ratio={matchesAspectRatio}
      onClick={onClick}
      style={{
        maxHeight: matchesMaxSizeAspectRation,
        minWidth: 250,
        maxWidth: matchesMaxSizeAspectRation,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 20,
      }}
      flex={1}
      ref={ref}
    >
      <Box style={{ position: 'relative' }}>
        <Image
          src={matchesLocalData.image}
          alt="hero"
          fill
          style={{
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            zIndex: -1,
            objectFit: 'cover',
            transition: 'all 1s',
          }}
        />
        <Flex justify="end" direction="column" style={{ height: '100%' }}>
          <Box style={{ position: 'relative' }} px={theme.spacing.md} py={theme.spacing.md}>
            <Overlay color="#000" backgroundOpacity={0.35} blur={5} style={{ zIndex: -1 }} />
            <Title order={5} style={{ color: 'white', fontSize: mathesTitleFontSize }}>
              {display}
            </Title>
            <Text
              lineClamp={2}
              style={{
                color: 'white',
                fontSize: mathesDescriptionFontSize,
              }}
            >
              {matchesLocalData.description}
            </Text>
          </Box>
        </Flex>
      </Box>
    </AspectRatio>
  );
}
