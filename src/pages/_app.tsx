import { CacheProvider, EmotionCache } from '@emotion/react';
import { GA_TRACKING_ID, gtmPageView } from '$logic/libs';
import { scrollToWindowHash } from '$logic/utils';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '$ui/cache';
import { MainLayout } from '$ui/components';
import { theme } from '$ui/theme';
import { DefaultSeo, NextSeoProps } from 'next-seo';
import { AppProps as BaseAppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import 'nprogress/nprogress.css';
import React, { useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.min.css';

const url = process.env.NEXT_PUBLIC_SITE_URL!;

export const DefaultSeoProps: NextSeoProps = {
  canonical: url,
  titleTemplate: '%s Dubai, UAE - Scandinavia Tech',
  defaultTitle: 'Scandinavia Tech: The Best Digital Agency in Dubai, UAE',
  description:
    'Scandinavia Tech is a digital agency in Dubai, UAE. We build websites, mobile apps, brands, and marketing campaigns full of creativity and innovation.',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: url,
    site_name: 'Scandinavia Tech',
    images: [
      {
        url: `${url}/assets/logo/logo-portrait.png`,
        alt: 'Scandinavia Tech Agency Logo',
        width: 500,
        height: 324,
        type: 'image/png',
      },
    ],
  },
  languageAlternates: [{ hrefLang: 'en-ae', href: url }],
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

const TopProgressBar = dynamic(
  () => {
    return import('../ui/components/shared/next-progress');
  },
  { ssr: false }
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppProps = {
  emotionCache?: EmotionCache;
} & BaseAppProps;

const App: React.VFC<AppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const router = useRouter();

  useEffect(() => {
    // To scroll to section by url hashing (ex: /home#blog)
    scrollToWindowHash();
  }, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtmPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...DefaultSeoProps} />
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <CacheProvider value={emotionCache}>
        <TopProgressBar />
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
