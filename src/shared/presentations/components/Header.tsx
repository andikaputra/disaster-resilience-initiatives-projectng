import Image from 'next/image';
import { useRouter } from 'next/router';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaMap } from 'react-icons/fa6';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  getGradient,
  Grid,
  MantineTheme,
  Space,
  Text,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Logo: React.FC<{ isLargeDevice?: boolean; theme: MantineTheme }> = ({
  isLargeDevice,
  theme,
}) => {
  const router = useRouter();
  return (
    <Box
      mx={20}
      onClick={() => router.push('/')}
      style={{
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'white',
        maxWidth: isLargeDevice ? 300 : undefined,
        cursor: 'pointer',
      }}
    >
      <Flex justify={'center'} align={'center'} p={10}>
        <Box
          w={isLargeDevice ? 40 : 60}
          h={isLargeDevice ? 40 : 60}
          style={{
            position: 'relative',
          }}
        >
          <Image
            src={'/images/bnpb_2x.png'}
            alt="logo"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box h={50} style={{ backgroundColor: theme.colors.gray[2] }} w={2} mx={10}></Box>
        <Text
          style={{
            color: theme.colors.base[6],
            fontWeight: 700,
            lineHeight: 1.3,
            fontSize: isLargeDevice ? 20 : undefined,
          }}
          mr={isLargeDevice ? 30 : undefined}
        >
          Teknologi <br /> Siaga Bencana
        </Text>
      </Flex>
    </Box>
  );
};

const ButtonNavigation: React.FC<{ isLargeDevice?: boolean; theme: MantineTheme }> = ({
  theme,
}) => {
  const router = useRouter();
  const matchesFlex = useMatches({ base: 'center', md: 'flex-end' });
  return (
    <Flex justify={matchesFlex} my={10} gap={10} wrap={'wrap'}>
      <Button
        leftSection={<FaMap />}
        onClick={() => router.push('/')}
        variant="light"
        size="sm"
        style={{
          color: router.pathname !== '/about' ? theme.colors.gray[0] : theme.colors.gray[0],
          borderRadius: 100,
          backgroundColor: router.pathname !== '/about' ? theme.colors.base[9] : 'transparent',
          fontWeight: 'normal',
          opacity: 0.8,
        }}
      >
        <Space w={10} /> Wilayah Anda
      </Button>
      <Button
        variant="light"
        onClick={() => router.push('/about')}
        size="sm"
        style={{
          color: router.pathname !== '/about' ? theme.colors.gray[0] : theme.colors.gray[0],
          borderRadius: 100,
          backgroundColor: router.pathname !== '/about' ? 'transparent' : theme.colors.base[9],
          fontWeight: 'normal',
          opacity: 0.8,
        }}
      >
        <Center>
          <Box w={15} h={15}>
            <FontAwesomeIcon icon={faVrCardboard} />
          </Box>
        </Center>{' '}
        <Space w={10} /> About {process.env.NEXT_PUBLIC_APP_AUTHOR}
      </Button>
    </Flex>
  );
};

const ButtonAuth: React.FC<{ isLargeDevice?: boolean; theme: MantineTheme }> = ({
  isLargeDevice,
  theme,
}) => {
  return (
    <Flex
      justify={isLargeDevice ? 'flex-end' : 'center'}
      my={isLargeDevice ? 10 : undefined}
      mx={isLargeDevice ? 10 : undefined}
      gap={10}
      wrap={'wrap'}
    >
      <Button
        variant=""
        p={10}
        style={{
          color: theme.colors.gray[0],
          borderRadius: 100,
          backgroundColor: 'transparent',
          fontWeight: 'normal',
          opacity: 0.8,
          textDecoration: 'underline',
        }}
      >
        Register
      </Button>
      <Button
        variant=""
        px={50}
        style={{
          color: theme.colors.gray[0],
          borderRadius: 100,
          backgroundColor: theme.colors.yellow[6],
          fontWeight: 'normal',
          opacity: 0.8,
        }}
      >
        Login
      </Button>
    </Flex>
  );
};

export default function Header() {
  const theme = useMantineTheme();
  const isLargeDevice = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  return (
    <header
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          position: 'absolute',
          zIndex: -1,
          backgroundColor: theme.colors.base[6],
        }}
      />
      <Box
        style={{
          left: 0,
          right: 0,
          bottom: -40,
          position: 'absolute',
          zIndex: 1,
          height: 40,
          background: getGradient(
            { deg: 180, from: theme.colors.base[6], to: 'transparent' },
            theme
          ),
        }}
      />
      <Container fluid>
        <Grid justify="center" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Logo isLargeDevice={isLargeDevice} theme={theme} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ButtonNavigation isLargeDevice={isLargeDevice} theme={theme} />
          </Grid.Col>
        </Grid>
      </Container>
    </header>
  );
}
