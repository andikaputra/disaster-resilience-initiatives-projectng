import React, { Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ChevronsRight } from 'react-feather';
import { FaLocationDot } from 'react-icons/fa6';
import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  getGradient,
  Grid,
  Space,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import type { Node, SimulationPlacesEntity } from '@/src/shared/domain/entities';
import {
  DataPresentationWrapper,
  SignatureSecureImage,
} from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';

const SimulationPlace: React.FC<Node> = ({
  wallpaper,
  id,
  existing_apps,
  province,
  slug,
  regency,
}) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  const router = useRouter();
  const matchesMinSize = useMatches({ base: undefined, md: 280 });
  return (
    <Box
      h="100%"
      mb={10}
      ref={ref}
      onClick={() => router.push(`/simulation-place/${slug}`)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        minHeight: matchesMinSize,
        overflow: 'hidden',
      }}
    >
      <SignatureSecureImage
        src={wallpaper ?? '/images/hero-background.png'}
        alt="hero"
        fill
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          objectFit: 'cover',
          zIndex: -1,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          position: 'absolute',
          transition: 'all 1s',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          height: hovered ? '100%' : '60%',
          transition: 'all 1s',
          background: getGradient(
            { deg: 180, from: 'transparent', to: theme.colors.base[10] },
            theme
          ),
        }}
      />
      <Flex justify="space-between" align="stretch" direction="column" h="100%">
        <Flex>
          {existing_apps?.map((badge, index) => (
            <Badge key={index} color={theme.colors.base[6]} style={{ opacity: 0.7 }} mr={5}>
              {badge.display}
            </Badge>
          ))}
        </Flex>
        <Flex justify="end" align="center">
          <Box my={30} p={10} style={{ position: 'relative' }}>
            <Box
              style={{
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                backgroundColor: 'white',
                opacity: 0.4,
                borderRadius: 100,
                position: 'absolute',
              }}
            />
            <Center>
              <ChevronsRight color={theme.colors.gray[4]} />
            </Center>
          </Box>
        </Flex>
        <Flex justify="flex-start" align="center">
          <Box>
            <FaLocationDot size={30} color={theme.colors.gray[4]} />
          </Box>
          <Space w={10} />
          <Flex
            justify="space-between"
            align="stretch"
            direction="column"
            style={{ minHeight: 50 }}
          >
            <Title style={{ color: theme.colors.gray[4], fontWeight: 'normal' }} order={3}>
              {province}
            </Title>
            <Title style={{ color: theme.colors.gray[4] }} order={3}>
              {regency}
            </Title>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default function SimulationPlaces() {
  const LEFT_CHUNK = 3;
  const RIGHT_CHUNK = 2;

  const { data } = usePageProps<SimulationPlacesEntity>();
  const gridRootPadding = useMatches({
    base: 5,
    md: 5,
  });
  const chunkData = useMemo(() => {
    const nodes = data?.nodes ?? [];
    if (nodes.length <= 0) {
      return [];
    }
    const mutableArray = [...nodes];
    const chunkDataTemp: { leftChunk: Node[]; rightChunk: Node[] }[] = [];
    const MAX_ITERATE = 100;
    let iterate = 0;
    while (iterate < MAX_ITERATE && mutableArray.length > 0) {
      iterate += 1;
      const newData = {
        leftChunk: mutableArray.splice(0, LEFT_CHUNK),
        rightChunk: mutableArray.splice(0, RIGHT_CHUNK),
      };
      chunkDataTemp.push(newData);
    }
    return chunkDataTemp;
  }, [data?.nodes]);

  return (
    <Container size="lg">
      <DataPresentationWrapper isEmpty={() => !chunkData?.length}>
        {chunkData.map((chunk, parentIndex) => (
          <Grid align="stretch" key={`root-chunk-${parentIndex}`}>
            <Fragment key={`cghunk-${parentIndex}-container`}>
              {chunk.leftChunk.length > 0 && (
                <Grid.Col
                  key={`left-chunk-${parentIndex}`}
                  span={{ base: 12, md: 'auto' }}
                  p={gridRootPadding}
                  order={{ base: 2, md: 1 }}
                  style={{ width: '100%' }}
                >
                  <Flex justify="center" align="stretch" direction="column" h="100%">
                    {chunk.leftChunk.map((node, leftChunkIndex) => (
                      <SimulationPlace key={`node-left-chunk-${leftChunkIndex}`} {...node} />
                    ))}
                  </Flex>
                </Grid.Col>
              )}
              {chunk.rightChunk.length > 0 && (
                <Grid.Col
                  span={{ base: 12, md: 'auto' }}
                  p={gridRootPadding}
                  order={{ base: 1, md: 2 }}
                  style={{ width: '100%' }}
                >
                  <Flex justify="center" align="stretch" direction="column" h="100%">
                    {chunk.rightChunk.map((node, rightChunkIndex) => (
                      <SimulationPlace key={`node-right-chunk-${rightChunkIndex}`} {...node} />
                    ))}
                  </Flex>
                </Grid.Col>
              )}
            </Fragment>
          </Grid>
        ))}
      </DataPresentationWrapper>
      <Space h={40} />
    </Container>
  );
}
