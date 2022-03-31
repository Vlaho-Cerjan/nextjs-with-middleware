import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import CustomThemeProvider from '../app/store/customThemeContext';
import { LanguageProvider } from '../app/store/languageContext';
import { ModeProvider } from '../app/store/modeContext';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import createEmotionCache from "app/utility/createEmotionCache";
import fetchJson from "app/lib/fetchJson";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../app/styles/global.scss';
import { SnackbarProvider } from 'notistack';
import { SessionProvider } from "next-auth/react"
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const generateClassName = createGenerateClassName();

const MyApp = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps }, } = props;
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <SessionProvider session={session}>
        <ModeProvider>
          <LanguageProvider>
            <StylesProvider generateClassName={generateClassName}>
              <CacheProvider value={emotionCache}>
                <CustomThemeProvider>
                  <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: "right", vertical: "top"}} variant="success" >
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </CustomThemeProvider>
              </CacheProvider>
            </StylesProvider>
          </LanguageProvider>
        </ModeProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
