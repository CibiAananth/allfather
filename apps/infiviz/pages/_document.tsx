/** @format */

import { createStylesServer, ServerStyles } from '@mantine/next';
import Document, { DocumentContext } from 'next/document';

import { emotionCache } from '@/utilities/cache';

// optional: you can provide your cache as a first argument in createStylesServer function
const stylesServer = createStylesServer(emotionCache());

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }
}
