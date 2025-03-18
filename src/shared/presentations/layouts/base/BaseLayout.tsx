import { Box, getGradient, Space, useMantineTheme } from '@mantine/core';
import { Footer, GlobalLoading, GlobalLoadingScreenBlocker, Header } from '../../components';

type BaseLayoutProps = {
  children: React.ReactNode;
  isShowBackgroundImage?: boolean;
  isShowGlobalLoadingBlocker?: boolean;
};

export function BaseLayout({
  children,
  isShowBackgroundImage = true,
  isShowGlobalLoadingBlocker = false,
}: BaseLayoutProps) {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        position: 'relative',
      }}
    >
      <GlobalLoading />
      <GlobalLoadingScreenBlocker isEnable={isShowGlobalLoadingBlocker} />
      <Header />
      <Box
        style={{
          flex: 1,
          minHeight: 300,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            visibility: isShowBackgroundImage ? 'visible' : 'hidden',
            height: '100%',
            backgroundImage: 'url(/images/hero-background.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundPositionY: 'top',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: isShowBackgroundImage ? '50%' : '100%',
            zIndex: -1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '50%',
              height: '50%',
              background: getGradient(
                {
                  deg: 180,
                  from: isShowBackgroundImage ? 'transparent' : theme.colors.base[10],
                  to: theme.colors.base[10],
                },
                theme
              ),
              zIndex: -1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '50%',
              backgroundColor: theme.colors.base[10],
              zIndex: -1,
            }}
          />
        </div>
        {children}
        <Space h={theme.spacing.xl} />
      </Box>
      <Footer />
    </div>
  );
}
