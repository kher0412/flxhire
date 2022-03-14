/* eslint-disable no-restricted-globals */
// NOTE: this module is included in the build through Worbox's webpack plugin
// And is turned into a workbox-powered service worker

import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { RangeRequestsPlugin } from 'workbox-range-requests'

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
        purgeOnQuotaError: true,
      }),
    ],
  }),
)

registerRoute(
  ({ url }) => url.host === 'cdn.filestackcontent.com',
  new CacheFirst({
    cacheName: 'filestack',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  }),
)

registerRoute(
  ({ url }) => url.host === 'd3kno80rquo2mz.cloudfront.net' || url.host === 'videos.flexhire.com' || (url.host === 's3.amazonaws.com' && url.pathname.startsWith('/flexhire-video-uploads')),
  new CacheFirst({
    cacheName: 'videos',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new RangeRequestsPlugin(),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  }),
)

// NOTE: might be rendundant with the WB_MANIFEST precaching
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/_next'),
  new CacheFirst({
    cacheName: 'assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  }),
)

// We need to keep a reference to __WB_MANIFEST or the SW compilation plugin will crash
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wbManifest = (self as any).__WB_MANIFEST

// NOTE: DO NOT ENABLE THE PRECACHE MANIFEST
// it will cause this issue: https://trello.com/c/OSdNMWBp/3481-service-worker-cache-can-get-too-big-in-the-dozens-of-gigabytes
// precacheAndRoute(wbManifest)
