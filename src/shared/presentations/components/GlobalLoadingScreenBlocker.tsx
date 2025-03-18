import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Progress, RingProgress, Space, Title, useMantineTheme } from '@mantine/core';

type GlobalLoadingScreenBlockerProps = {
  isEnable?: boolean;
};
export default function GlobalLoadingScreenBlocker({
  isEnable = false,
}: GlobalLoadingScreenBlockerProps) {
  const [progress, setProgress] = useState(0);
  const [hideProgress, setHideProgress] = useState(true);
  const router = useRouter();
  const theme = useMantineTheme();
  useEffect(() => {
    let resetProgress: NodeJS.Timeout;
    let resetHide: NodeJS.Timeout;
    const onRouteChangeStart = () => {
      setProgress(() => 40);
      setHideProgress(() => false);
    };
    const onRouteChangeComplete = () => {
      setProgress(() => 100);
      resetProgress = setTimeout(() => {
        resetHide = setTimeout(() => {
          setProgress(() => 0);
          setHideProgress(true);
        }, 1000);
      }, 1400);
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      clearTimeout(resetProgress);
      clearTimeout(resetHide);
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
  if (!isEnable) {
    return null;
  }
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{
        position: 'fixed',
        backgroundColor: theme.colors.base[10],
        left: 0,
        right: 0,
        top: 0,
        zIndex: 999999999,
        bottom: 0,
        opacity: hideProgress ? 0 : 1,
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0s',
        visibility: hideProgress ? 'hidden' : 'visible',
      }}
    >
      <Box style={{ width: 75, height: 75, position: 'relative' }}>
        <Image
          src="/images/bnpb_2x.png"
          alt="logo"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
    </Flex>
  );
}
