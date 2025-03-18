import React, { createContext } from 'react';

export const PagePropsContext = createContext({});

const PagePropsProvider: React.FC<React.PropsWithChildren<{ pageProps: any }>> = ({
  children,
  pageProps,
}) => <PagePropsContext.Provider value={{ ...pageProps }}>{children}</PagePropsContext.Provider>;

export default PagePropsProvider;
