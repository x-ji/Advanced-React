import Document, { Html, Head, NextScript, Main } from 'next/document';

// Just a NextJS thing because it didn't have an API for hooks yet.
export default class MyDocument extends Document {
  // A class in React has a render method. Similar to using the usual return.
  // Will put the CSS inside of the head.
  render() {
    return (
      <Html lang="en-CA">
        {/* <Head></Head> */}
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
