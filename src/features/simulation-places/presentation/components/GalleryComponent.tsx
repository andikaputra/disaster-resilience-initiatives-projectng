import { Fragment, useMemo } from 'react';
import { getCookie } from 'cookies-next/client';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Box, Flex, Grid, Space, Title, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { SignatureContainer, SignatureSecureImage } from '@/src/shared/presentations/components';

import 'react-photo-view/dist/react-photo-view.css';

type BorderRadiusImageProps = {
  image?: string;
  width?: string | number;
  height?: string | number;
  flex?: number;
};
const BorderRadiusImage: React.FC<BorderRadiusImageProps> = ({ image, height, width, flex }) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const cookie = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string);
  const imageSrcWithToken = `${image}&token=${cookie}`;
  return (
    <Box
      ref={ref}
      flex={flex ?? 1}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        minHeight: 200,
        transition: 'all 0.5s ease',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: 10,
        opacity: hovered ? 1 : 0.7,
        overflow: 'hidden',
      }}
    >
      <PhotoProvider speed={() => 400} maskOpacity={0.9} bannerVisible={false}>
        <PhotoView src={imageSrcWithToken ?? '/images/galleries/BNPB09251.jpg'}>
          <SignatureSecureImage
            src={image ?? '/images/galleries/BNPB09251.jpg'}
            alt=""
            fill
            style={{
              transition: 'all 0.5s ease',
              backgroundColor: theme.colors.base[9],
              objectFit: 'cover',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </PhotoView>
      </PhotoProvider>
    </Box>
  );
};

type GalleryComponentProps = {
  images?: string[];
};

export default function GalleryComponent({ images }: GalleryComponentProps) {
  const LEFT_TOP_CHUNK = 1;
  const LEFT_BOTTOM_CHUNK = 2;
  const RIGHT_CHUNK = 1;
  const theme = useMantineTheme();

  const chunkData = useMemo(() => {
    if (images === undefined) return [];
    const mutableArray = [...images];
    const chunkDataTemp: {
      leftChunk: {
        leftTopChunk: string[];
        leftBottomChunk: string[];
      };
      rightChunk: string[];
    }[] = [];
    const MAX_ITERATE = 100;
    let iterate = 0;
    while (iterate < MAX_ITERATE && mutableArray.length > 0) {
      iterate += 1;
      const newData = {
        leftChunk: {
          leftTopChunk: mutableArray.splice(0, LEFT_TOP_CHUNK),
          leftBottomChunk: mutableArray.splice(0, LEFT_BOTTOM_CHUNK),
        },
        rightChunk: mutableArray.splice(0, RIGHT_CHUNK),
      };
      chunkDataTemp.push(newData);
    }
    return chunkDataTemp;
  }, [images, images?.length]);

  return (
    <>
      <SignatureContainer>
        <Space h={theme.spacing.xl} />
        <Title order={3} style={{ textAlign: 'center' }}>
          Gallery Kegiatan
        </Title>
        <Space h={theme.spacing.xl} />
        <Grid justify="stretch" align="stretch">
          {chunkData.map((chunk, chunkIndex) => (
            <Fragment key={`chunk-parent-index-${chunkIndex}`}>
              {(chunk.leftChunk.leftTopChunk.length !== 0 ||
                chunk.leftChunk.leftBottomChunk.length !== 0) && (
                <>
                  <Fragment key="chunk-left-index">
                    <Grid.Col span={{ base: 12, md: 'auto' }}>
                      <Flex
                        direction="column"
                        justify="stretch"
                        align="stretch"
                        gap={10}
                        style={{ height: '100%' }}
                      >
                        {chunk.leftChunk.leftTopChunk.length !== 0 && (
                          <>
                            {chunk.leftChunk.leftTopChunk.map(
                              (leftTopChunkImage, leftTopChunkIndex) => (
                                <BorderRadiusImage
                                  key={`chunk-left-top-index-${leftTopChunkIndex}`}
                                  image={leftTopChunkImage}
                                />
                              )
                            )}
                          </>
                        )}
                        {chunk.leftChunk.leftBottomChunk.length !== 0 && (
                          <>
                            <Flex direction="row" gap={10} style={{ height: '100%' }}>
                              {chunk.leftChunk.leftBottomChunk.map(
                                (rightChunkImage, rightChunkIndex) => (
                                  <BorderRadiusImage
                                    key={`chunk-right-index-${rightChunkIndex}`}
                                    image={rightChunkImage}
                                  />
                                )
                              )}
                            </Flex>
                          </>
                        )}
                      </Flex>
                    </Grid.Col>
                  </Fragment>
                </>
              )}
              {chunk.rightChunk.length !== 0 && (
                <>
                  <Grid.Col span={{ base: 12, md: 'auto' }}>
                    <Flex direction="column" align="stretch" style={{ height: '100%' }}>
                      {chunk.rightChunk?.map((rightChunkImage, rightChunkIndex) => (
                        <BorderRadiusImage
                          key={`chunk-right-index-${rightChunkIndex}`}
                          image={rightChunkImage}
                        />
                      ))}
                    </Flex>
                  </Grid.Col>
                </>
              )}
            </Fragment>
          ))}
        </Grid>
      </SignatureContainer>
    </>
  );
}
