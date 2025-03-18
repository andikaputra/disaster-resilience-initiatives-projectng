import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Container, Flex, Space, Text, Title, useMantineTheme } from '@mantine/core';

const testimonies: TestimoniItemProps[] = [
  {
    name: 'Restu',
    image: '/images/testimonials/testimonial_1.png',
    description:
      'Dari sini saya belajar kita selalu siaga terhadap bencana yang akan datang melalui simulasi bencana VR ',
  },
  {
    name: 'Esa',
    image: '/images/testimonials/testimonial_2.png',
    description:
      'Sangat menarik untuk mencoba aplikasi, dan mendapat edukasi bencana alam dalam keadaan nyata',
  },
  {
    name: 'Aprilia',
    image: '/images/testimonials/testimonial_3.png',
    description:
      'Sangat menyenangkan, sangat bermanfaat nanti ketika ada bencana alam gempa/tsunami sudah mengerti rambu atau arah yang diberikan oleh petugas BNPB',
  },
  {
    name: 'Arisudana',
    image: '/images/testimonials/testimonial_4.png',
    description:
      'Latihan dan pemahaman tentang cara bertindak dalam situasi darurat sangat membantu mengurangi panik dan meningkatkan keselamatan.',
  },
  {
    name: 'Dila',
    description:
      'Simulasi dari BNPB ini sangat relevan dengan bencana yang terjadi dan sangat menarik juga tidak mengandalkan remote saja tapi juga tubuh kita juga',
  },
  {
    name: 'Ilham',
    description:
      'Dari sini saya belajar kita selalu siaga terhadap bencana yang akan datang melalui simulasi bencana VR',
  },
  {
    name: 'Wiliam',
    description:
      'Setelah saya menggunakan VR Simulasi dari BNPB ini jadi tau titik kumpul dari satu tempat ke tempat yang lain dan simulasinya sangat menyenangkan',
  },
  {
    name: 'Windy',
    description: 'Virtual tour ini buat aku bisa belajar  saat terjadi gempa mau mengarah kemana ',
  },
  {
    name: 'Alexander',
    description:
      'Sangat menyenangkan, sangat bermanfaat nanti ketika ada bencana alam gempa/tsunami sudah mengerti rambu atau arah yang diberikan oleh petugas BNPB',
  },
  {
    name: 'Indra',
    description:
      'Game vr seru, ada di pantai dan tiba” ada gempa dan ada misi untuk berlari ke tempat evakuasi',
  },
];

type TestimoniItemProps = {
  image?: string;
  name?: string;
  description?: string;
};

const TestimoniItem: React.FC<TestimoniItemProps | undefined> = (props) => {
  const theme = useMantineTheme();
  return (
    <Box style={{ borderRadius: 10, height: '50%' }} p={10}>
      <Flex direction="row" justify="center" align="start">
        <Box style={{ width: 100, height: 100 }}>
          <Image
            src={props?.image ?? 'https://picsum.photos/seed/picsum/200'}
            alt="testimoni"
            width={100}
            height={100}
            style={{ borderRadius: '50%', overflow: 'hidden', padding: 10 }}
          />
        </Box>
        <Box flex={1} style={{ height: '100%' }}>
          <Flex
            justify="stretch"
            align="stretch"
            direction="column"
            p={10}
            style={{ height: '100%' }}
          >
            <Title style={{ width: '100%', color: theme.colors.base[6] }} order={4}>
              {props?.name ?? ''}
            </Title>

            <Text lineClamp={6} style={{ color: theme.colors.gray[8] }}>
              {props?.description ?? ''}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default function Testimoni() {
  const theme = useMantineTheme();
  return (
    <>
      <Container fluid size="xl" m={0} p={0}>
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Title order={3} style={{ color: 'white', textAlign: 'center' }}>
          Testimoni Pengguna
        </Title>
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          modules={[Autoplay]}
          style={{
            height: 200,
          }}
          autoplay={{
            delay: 0,
          }}
          centeredSlides
          centerInsufficientSlides
          centeredSlidesBounds
          loop
          speed={10000}
        >
          {testimonies.map((testimoni, index) => (
            <SwiperSlide
              key={index}
              style={{ width: 400, backgroundColor: 'white', borderRadius: 10 }}
            >
              <TestimoniItem {...testimoni} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
}
