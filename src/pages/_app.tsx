import 'reflect-metadata';
// DONT MOVE REFLECT METADATA IMPORT ABOVE

import '@mantine/core/styles.css';

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { NextPage } from 'next';
import NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { init, push } from '@socialgouv/matomo-next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Center, ColorSchemeScript, Flex, MantineProvider, Text } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PagePropsProvider } from '@/src/shared/presentations/contexts';
import { theme } from '../../theme';
import { setRequestContext } from '../framework/client/client';

import '@mantine/notifications/styles.css';

import { useEffectMatomo } from '../framework/matomo';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { preparationReady, token, ...pageProps },
}: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const [isPreparationReady, setIsPreparationReady] = useState(false);
  useEffect(() => {
    if (!preparationReady) return;
    setIsPreparationReady(true);
  }, [preparationReady]);
  useEffectMatomo();
  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider theme={theme} forceColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <PagePropsProvider pageProps={pageProps}>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/images/bnpb_2x.png" />
            </Head>
            {getLayout(
              isPreparationReady ? (
                <Component {...pageProps} />
              ) : (
                <Flex
                  style={{
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  justify="center"
                  align="center"
                >
                  <Center>
                    <Text style={{ textAlign: 'center' }}>Securing your connection...</Text>
                  </Center>
                </Flex>
              )
            )}
          </PagePropsProvider>
        </QueryClientProvider>
        <Notifications position="top-right" />
      </MantineProvider>
    </>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const ctx = await NextApp.getInitialProps(context);
  setRequestContext(context.ctx);
  return { ...ctx, pageProps: { ...ctx.pageProps, preparationReady: true } };
};
