import { useRouter } from 'next/router';
import { FaVrCardboard } from 'react-icons/fa6';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import {
  Box,
  Container,
  Divider,
  Flex,
  getGradient,
  Space,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';

export default function Header() {
  const theme = useMantineTheme();
  const router = useRouter();
  const title = useRouter().asPath.split('/').at(-1)?.split('-').join(' - ');
  const matchesFlexJustify = useMatches({ base: 'center', xs: 'space-between' });
  const matchesTitleFontSize = useMatches({ base: 16, xs: 18, md: 20 });
  const matchesTitleIconSize = useMatches({ base: 25, xs: 30, md: 40 });
  return (
    <>
      <Box style={{ position: 'relative', zIndex: 1 }}>
        <Box
          style={{
            left: 0,
            right: 0,
            top: 0,
            position: 'absolute',
            zIndex: -1,
            height: 90,
            background: getGradient(
              { deg: 180, from: theme.colors.base[6], to: 'transparent' },
              theme
            ),
          }}
        />
        <Box
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: -1,
            background: getGradient(
              { deg: 180, from: theme.colors.base[6], to: theme.colors.base[10] },
              theme
            ),
            opacity: 0.7,
            position: 'absolute',
          }}
        />
        <Container fluid p={theme.spacing.md}>
          <Flex justify={matchesFlexJustify} align="center" wrap="wrap">
            <Box>
              <Flex
                flex={1}
                justify="start"
                align="center"
                onClick={() => router.back()}
                style={{ cursor: 'pointer' }}
              >
                <IoArrowBackCircleSharp size={matchesTitleIconSize} color="white" />
                <Space w={theme.spacing.md} />
                <Title style={{ color: 'white', fontSize: matchesTitleFontSize }} order={3}>
                  360 Virtual Reality
                </Title>
              </Flex>
            </Box>
            <Box>
              <Flex flex={1} justify="end" align="center" ml={theme.spacing.xl}>
                <FaVrCardboard color="white" size={matchesTitleIconSize} />
              </Flex>
            </Box>
          </Flex>
          <Divider w="100%" color="white" mt={theme.spacing.lg} />
          <Title
            order={3}
            pt={theme.spacing.md}
            style={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
          >
            {title}
          </Title>
        </Container>
      </Box>
    </>
  );
}
