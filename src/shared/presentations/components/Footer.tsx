import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import {
  Divider,
  Flex,
  Grid,
  Space,
  Text,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';

const CompanyInformation: React.FC = () => {
  const descMr = useMatches({
    base: undefined,
    md: 200,
  });
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Grid px={10}>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Flex direction="column" mr={descMr}>
          <Title>{process.env.NEXT_PUBLIC_APP_AUTHOR}</Title>
          <Space h="xl" />
          <Text style={{ color: theme.colors.gray[5] }}>
            Inovasi Teknologi ala BNPB guna membantu masyarakat bersikap lebih siap siaga dalam
            menghadapi bencana. Aplikasi digital ini dikembangkan dengan basis teknologi Augmented
            Reality (AR) dan Virtual Reality (VR), yang akan memberikan simulasi secara virtual
            seakan-akan sedang terjadi bencana gempa bumi atau tsunami. Sehingga masyarakat bisa
            memahami dampaknya serta apa yang harus dilakukan pada saat terjadi bencana tersebut di
            pesisir Indonesia. Saat ini baru terdapat 9 desa/kelurahan di Indonesia sebagai tahap
            awal pengembangan dan implementasi.
          </Text>
        </Flex>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex direction="column">
              <Title order={3}>Company</Title>
              <Space h="xl" />
              <Flex direction="column" gap={10}>
                <Text
                  onClick={() => router.push('/?section=implementation')}
                  style={{ color: theme.colors.gray[5], cursor: 'pointer' }}
                >
                  Wilayah Implementasi
                </Text>
                <Text
                  onClick={() => router.push('/about')}
                  style={{ color: theme.colors.gray[5], cursor: 'pointer' }}
                >
                  About
                </Text>
                <Text
                  onClick={() => router.push('/about')}
                  style={{ color: theme.colors.gray[5], cursor: 'pointer' }}
                >
                  Artikel
                </Text>
              </Flex>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex direction="column">
              <Title order={3}>Get in Touch</Title>
              <Space h="xl" />
              <Flex direction="column" gap={10}>
                <Link
                  href="https://wa.me/6285156824939"
                  passHref
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Flex align="center">
                    <FaWhatsapp style={{ color: theme.colors.gray[5] }} />
                    <Space w={theme.spacing.xs} />
                    <Text style={{ color: theme.colors.gray[5] }}>+62 851-5682-4939</Text>
                  </Flex>
                </Link>
                <Link
                  href="https://360demo.cloud/s/hDvHxi"
                  passHref
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Flex align="center">
                    <FaInstagram style={{ color: theme.colors.gray[5] }} />
                    <Space w={theme.spacing.xs} />
                    <Text style={{ color: theme.colors.gray[5] }}>BNPB</Text>
                  </Flex>
                </Link>
                <Link
                  href="https://360demo.cloud/s/FqhOlt"
                  passHref
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Flex align="center">
                    <FaInstagram style={{ color: theme.colors.gray[5] }} />
                    <Space w={theme.spacing.xs} />
                    <Text style={{ color: theme.colors.gray[5] }}>Inovtek BNPB</Text>
                  </Flex>
                </Link>
                <Link
                  href="https://360demo.cloud/s/BYBSKJ"
                  passHref
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Flex align="center">
                    <FaYoutube style={{ color: theme.colors.gray[5] }} />
                    <Space w={theme.spacing.xs} />
                    <Text style={{ color: theme.colors.gray[5] }}>Youtube BNPB</Text>
                  </Flex>
                </Link>
                <Link
                  href="https://360demo.cloud/s/HL1A7D"
                  passHref
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Flex align="center">
                    <FaTiktok style={{ color: theme.colors.gray[5] }} />
                    <Space w={theme.spacing.xs} />
                    <Text style={{ color: theme.colors.gray[5] }}>Tiktok BNPB</Text>
                  </Flex>
                </Link>
              </Flex>
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

const Copyright: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Grid px={10}>
      <Grid.Col span={{ base: 12 }}>
        <Text style={{ color: theme.colors.gray[5] }}>
          (c) 2024. INOVTEK - Solusi Teknologi Siaga Bencana. Hak Cipta Dilindungi
        </Text>
      </Grid.Col>
    </Grid>
  );
};

export default function Footer() {
  const theme = useMantineTheme();
  const mxRoot = useMatches({
    base: 30,
    lg: 79,
  });
  return (
    <footer style={{ width: '100%', backgroundColor: '#000000' }}>
      <Flex direction="column" mx={mxRoot} mt={40} mb={20}>
        <CompanyInformation />
        <Space h={30} />
        <Divider h={1} color={theme.colors.base[9]} my={10} />
        <Copyright />
      </Flex>
    </footer>
  );
}
