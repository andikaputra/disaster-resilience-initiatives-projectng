import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { Button, Container, Flex, Space, Text, useMantineTheme } from '@mantine/core';
import { TextGlitch } from '../shared/presentations/components';
import { BaseLayout } from '../shared/presentations/layouts/base/BaseLayout';

function Error({ err }: any) {
  const theme = useMantineTheme();
  const router = useRouter();
  const title = err?.data?.title;
  const subTitle = err?.data?.subTitle;
  return (
    <Container style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
      <Flex
        justify="center"
        align="center"
        direction="column"
        style={{ height: '100%', width: '100%' }}
      >
        <VscDebugDisconnect size={100} color={theme.colors.base[9]} />
        <Space h={theme.spacing.lg} />
        <TextGlitch style={{ fontSize: 20 }}>
          {title ?? '500 : Terjadi kesalahan server'}
        </TextGlitch>
        <Text>{subTitle}</Text>
        <Space h={theme.spacing.lg} />
        <Space h={theme.spacing.lg} />
        <Button onClick={() => router.replace('/')} color={theme.colors.base[9]}>
          Kembali
        </Button>
      </Flex>
    </Container>
  );
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

Error.getInitialProps = ({ err }: any) => ({ err });

export default Error;
