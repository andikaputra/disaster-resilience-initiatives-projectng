import Link from 'next/link';
import {
  AspectRatio,
  Box,
  Flex,
  getGradient,
  Space,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { SignatureContainer, SignatureSecureImage } from '@/src/shared/presentations/components';

type LinkComponentProps = {
  link?: string;
  title?: string;
  icon?: string;
};
const LinkComponent: React.FC<LinkComponentProps> = ({ link, title, icon }) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  return (
    <Link target="_blank" href={link ?? '#'} passHref style={{ textDecoration: 'none' }}>
      <Flex ref={ref} align="center" justify="center" direction="column">
        <AspectRatio
          ratio={1 / 1}
          style={{
            borderRadius: 10,
            width: 100,
            height: 100,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.5s ease',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: -1,
              opacity: 0.7,
              background: getGradient({ from: '#2E4AD4', to: 'transparent', deg: 130 }, theme),
            }}
          />
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: -1,
              opacity: 0.7,
              background: getGradient({ from: 'transparent', to: '#D4A025', deg: 130 }, theme),
            }}
          />
          <Flex style={{ height: '100%', width: '100%', position: 'relative' }}>
            <SignatureSecureImage
              src={icon ?? ''}
              alt={title ?? 'Tautan'}
              fill
              style={{ objectFit: 'contain', padding: theme.spacing.xs }}
            />
          </Flex>
        </AspectRatio>
        <Space h={theme.spacing.md} />
        <Text
          style={{ textDecoration: 'none', color: 'white', maxWidth: 200, textAlign: 'center' }}
          fw={100}
        >
          {title ?? 'Tautan'}
        </Text>
      </Flex>
    </Link>
  );
};

type LinksProps = {
  links?: LinkComponentProps[];
};

export default function Links({ links }: LinksProps) {
  const theme = useMantineTheme();
  return (
    <>
      <SignatureContainer>
        <Space h={theme.spacing.xl} />
        <Title order={3} style={{ textAlign: 'center' }}>
          Link Tautan
        </Title>
        <Space h={theme.spacing.xl} />
        <Flex justify="center" align="flex-start" wrap="wrap" gap={10}>
          {links?.map((link, index) => <LinkComponent {...link} key={index} />)}
        </Flex>
      </SignatureContainer>
    </>
  );
}
