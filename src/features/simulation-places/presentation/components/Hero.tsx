import React, { Fragment, useMemo, useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Box, Flex, Grid, Space, Text, Title, useMantineTheme, useMatches } from '@mantine/core';

import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useHover } from '@mantine/hooks';
import { SimulationPlaceDetailEntity } from '@/src/shared/domain/entities';
import {
  DataPresentationWrapper,
  SignatureContainer,
  SignatureSecureImage,
} from '@/src/shared/presentations/components';
import SimulationTechnology from '@/src/shared/presentations/components/segmented/SimulationTechnology';
import { usePageProps } from '@/src/shared/presentations/contexts/AppPageHooks';

const SliderImage: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const { hovered: hoveredLeft, ref: leftRef } = useHover();
  const { hovered: hoveredRight, ref: rightRef } = useHover();
  const matchesGridColMinHeight = useMatches({ base: 300, md: 600 });
  const { data } = usePageProps<SimulationPlaceDetailEntity>();
  const images = useMemo(() => (data?.wallpaper ? [data.wallpaper] : []), [data]);
  return (
    <Grid.Col
      span={{ base: 12, lg: 3 }}
      style={{ minHeight: matchesGridColMinHeight, position: 'relative' }}
    >
      <DataPresentationWrapper isEmpty={() => !images?.length}>
        <>
          {/* <Box
            ref={leftRef}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            visibleFrom="md"
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transition: 'all 0.1s ease',
              transform: `translateY(-50%) ${hoveredLeft ? 'scale(1.3)' : 'scale(1)'} `,
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            <ChevronLeft color="white" size={80} />
          </Box>
          <Box
            ref={rightRef}
            onClick={() => swiperRef.current?.swiper.slideNext()}
            visibleFrom="md"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transition: 'all 0.1s ease',
              transform: `translateY(-50%) ${hoveredRight ? 'scale(1.3)' : 'scale(1)'} `,
              zIndex: 2,
              cursor: 'pointer',
            }}
          >
            <ChevronRight color="white" size={80} />
          </Box> */}
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
            pagination={{ clickable: true }}
            style={{ height: '100%' }}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{
                  height: '100%',
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              >
                <SignatureSecureImage src={image} alt="hero" fill style={{ objectFit: 'cover' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </DataPresentationWrapper>
    </Grid.Col>
  );
};

const PlaceTitle: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const fontSizeTitle = useMatches({ base: 80, md: 50 });
  const fontSizeDescription = useMatches({ base: 60, md: 50 });
  const { data } = usePageProps<SimulationPlaceDetailEntity>();
  return (
    <Grid.Col span={{ base: 12, lg: 9 }}>
      <Flex direction="column" style={{ height: '100%' }}>
        <Title order={1} style={{ fontSize: fontSizeTitle, color: 'white' }}>
          {data?.province}
        </Title>
        <Title style={{ fontSize: fontSizeDescription, color: 'white' }}>{data?.regency}</Title>
        <Text mt={20} style={{ color: 'white' }}>
          #teknologisiagabencana
        </Text>
        <Text style={{ color: 'white', fontSize: 20 }} mt={10}>
          Teknologi Simulasi Bencana yang Tersedia
        </Text>
        <Space h={theme.spacing.lg} />
        <Flex flex={1} direction="row" wrap="wrap" align="end" justify="stretch" gap={10}>
          <DataPresentationWrapper isEmpty={() => !data?.existing_apps?.length}>
            {data?.existing_apps?.map((app, index) => (
              <SimulationTechnology
                onClick={() => {
                  if (app.code === 'vr-360-tour') {
                    router.push(`/vr-tour/${data?.slug}`);
                  } else if (app.code === 'vr-simulator') {
                    router.push(`/vr-simulator/${data?.slug}`);
                  } else if (app.code === 'ar-wayfinder') {
                    router.push(`/ar-wayfinder/${data?.slug}`);
                  }
                }}
                key={index}
                {...app}
              />
            ))}
          </DataPresentationWrapper>
        </Flex>
      </Flex>
    </Grid.Col>
  );
};

export default function Hero() {
  const theme = useMantineTheme();
  return (
    <SignatureContainer>
      <Space mt={theme.spacing.xl} />
      <Grid>
        <SliderImage />
        <PlaceTitle />
      </Grid>
    </SignatureContainer>
  );
}
