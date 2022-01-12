import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from '$ui/cache';
import { theme } from '$ui/theme';
import Document, { Head, Html, Main, NextScript } from 'next/document';

type ExtraDocumentProps = {
  emotionStyleTags: JSX.Element[];
};

export default class MyDocument extends Document<ExtraDocumentProps> {
  render() {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='shortcut icon' href='/assets/images/logo/favicon.ico' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />

          {this.props.emotionStyleTags}
        </Head>
        <body style={{ overflowX: 'hidden', maxWidth: 2000, margin: '0 auto' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<any>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
