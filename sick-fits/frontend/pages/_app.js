import Page from '../components/Page.jsx';

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps}></Component>
    </Page>
  );
}
