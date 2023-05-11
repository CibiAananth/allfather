/** @format */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// project dependencies
import type { Locale } from '@/config/i18n/settings';
import {
  cookieName,
  getBrowserLanguage,
  settings,
} from '@/config/i18n/settings';

export const config = {
  // matcher: '/:lng*'
  /**
   * The following pattern will match any URL that does not contain any of the specified sub-paths (api, _next/static, _next/image, assets, favicon.ico, sw.js).
   * This is useful for redirecting all requests to a specific language, except for the ones that are handled by Next.js (api, _next/static, _next/image, assets, favicon.ico, sw.js).
   */
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
export function middleware(req: NextRequest) {
  /**
   * If the request URL pathname does not start with any of the specified sub-paths in config.matcher (api, _next
   * static, _next, image, assets, favicon.ico, sw.js) and the pathname of the URL does not start with
   * any locale in i18n.locales, redirect the request to the same URL but with the default language code added to the
   * beginning of the URL.
   *
   * For example, if the request URL is https://example.com/fr/about, then the request will be redirected to https://example.com/en/about.
   *
   * For example, if the request URL is https://example.com/about, then the request will be redirected to https://example.com/en/about.
   *
   * If the request URL contains any of the specified sub-paths (api, _next/static, _next/image, assets, favicon.ico, sw.js), then the request will be passed to the Next.js router.
   *
   * For example, if the request URL is https://example.com/_next/static/chunks/pages/about.js, then the request will be passed to the Next.js router.
   */

  if (
    !settings.locales.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    const languageCode: Locale = getBrowserLanguage(req);

    return NextResponse.redirect(
      new URL(`/${languageCode}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '', req.url);
    const languageCodeInReferer = settings.locales.find(loc =>
      refererUrl.pathname.startsWith(`/${loc}`),
    );

    if (languageCodeInReferer) {
      const response = NextResponse.next();

      response.cookies.set(cookieName, languageCodeInReferer);

      return response;
    }
  }

  return NextResponse.next();
}
