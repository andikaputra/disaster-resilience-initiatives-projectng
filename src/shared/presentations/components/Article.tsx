import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import {
  Box,
  Card,
  Flex,
  Grid,
  Group,
  Space,
  Text,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';

import 'swiper/css';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Autoplay } from 'swiper/modules';
import { useHover } from '@mantine/hooks';
import { SignatureContainer, SignatureSecureImage } from '@/src/shared/presentations/components';

type ArticleItemProps = {
  image?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
};

const ArticleItem: React.FC<ArticleItemProps> = ({ image, title, description, onClick }) => {
  const theme = useMantineTheme();
  return (
    <Box p={10} style={{ height: '100%', cursor: 'pointer' }} onClick={onClick}>
      <Card
        shadow="sm"
        withBorder
        style={{ backgroundColor: theme.colors.gray[2], height: '100%' }}
      >
        <Flex style={{ height: '100%' }} direction="column">
          <Card.Section>
            <Box style={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden' }}>
              <SignatureSecureImage
                fill
                src={image ?? '/images/hero-vr-image.png'}
                alt="Norway"
                style={{
                  transform: 'scale(1.1)',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Card.Section>
          <Box flex={1}>
            <Flex direction="column" align="start" justify="flex-start" style={{ height: '100%' }}>
              <Group justify="space-between" mt="md" mb="xs">
                <Text style={{ color: theme.colors.base[6], fontWeight: 'bolder' }}>{title}</Text>
              </Group>
              <Text size="sm" c="dimmed" lineClamp={3}>
                {description}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

type ArticleProps = {
  items?: ArticleItemProps[];
};

export default function Article({ items }: ArticleProps) {
  const theme = useMantineTheme();
  const swiperRef = useRef<SwiperRef>(null);
  const { hovered: hoveredLeft, ref: leftRef } = useHover();
  const { hovered: hoveredRight, ref: rightRef } = useHover();
  const matchesSlider = useMatches({
    base: 2,
    md: 4,
  });
  const matchesContainerEdgeInset = useMatches({
    base: 0,
    md: theme.spacing.lg,
  });
  return (
    <SignatureContainer m={matchesContainerEdgeInset} p={matchesContainerEdgeInset}>
      <Space h={theme.spacing.xl} />
      <Title order={3} style={{ textAlign: 'center', color: 'white' }}>
        Temukan Artikel Terkait
      </Title>
      <Space h={theme.spacing.xl} />
      <Grid>
        <Grid.Col
          ref={leftRef}
          span={{ base: 1 }}
          visibleFrom="md"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <Flex
            direction="column"
            align="center"
            justify="center"
            style={{
              height: '100%',
              transition: 'all 0.1s ease',
              transform: `${hoveredLeft ? 'scale(1.3)' : 'scale(1)'} `,
            }}
          >
            <ChevronLeft color="white" size={50} />
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 10 }} style={{ minHeight: 300 }}>
          <Swiper
            ref={swiperRef}
            slidesPerView={matchesSlider}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            centeredSlides
            centerInsufficientSlides
            centeredSlidesBounds
            modules={[Autoplay]}
            style={{ height: '100%' }}
          >
            {items?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  height: '100%',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <ArticleItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid.Col>
        <Grid.Col
          ref={rightRef}
          span={{ base: 1 }}
          visibleFrom="md"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <Flex
            direction="column"
            align="center"
            justify="center"
            style={{
              height: '100%',
              transition: 'all 0.1s ease',
              transform: `${hoveredRight ? 'scale(1.3)' : 'scale(1)'} `,
            }}
          >
            <ChevronRight color="white" size={50} />
          </Flex>
        </Grid.Col>
      </Grid>
    </SignatureContainer>
  );
}
