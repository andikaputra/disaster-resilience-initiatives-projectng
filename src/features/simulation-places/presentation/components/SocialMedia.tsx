import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { Box, Center, Flex, Space, Title, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { SignatureContainer, SignatureSecureImage } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { SimulationPlaceServerSideProps } from '../../domain/types';

type SocialMediaItemProps = {
  icon?: string;
  title?: string;
  href?: string;
};
const SocialMediaItem: React.FC<SocialMediaItemProps> = ({ icon, title, href }) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  return (
    <Link href={href ?? '#'} passHref style={{ textDecoration: 'none' }} target="_blank">
      <Box
        ref={ref}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.5s ease',
        }}
        w={200}
        opacity={0.9}
        mx={theme.spacing.sm}
        px={theme.spacing.lg}
        py={theme.spacing.sm}
      >
        <Flex justify="center" align="center">
          <Box style={{ position: 'relative', width: 30, height: 30 }}>
            <SignatureSecureImage src={icon ?? ''} alt={title ?? ''} fill />
          </Box>
        </Flex>
        <Space h={theme.spacing.xs} />
        <Center>
          <Title order={6}>{title}</Title>
        </Center>
      </Box>
    </Link>
  );
};

type SocialMediaProps = {
  regionName?: string;
  socialMedias?: SocialMediaItemProps[];
};

export default function SocialMedia({ socialMedias, regionName }: SocialMediaProps) {
  const theme = useMantineTheme();
  return (
    <SignatureContainer>
      <Space h={theme.spacing.xl} />
      <Title order={3} style={{ textAlign: 'center' }}>
        {regionName}
      </Title>
      <Space h={theme.spacing.xl} />
      <Flex wrap="wrap" justify="center" align="center" gap={10}>
        {socialMedias?.map((item, index) => <SocialMediaItem {...item} key={index} />)}
      </Flex>
    </SignatureContainer>
  );
}
