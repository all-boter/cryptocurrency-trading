import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    // 默认使用 edge runtime
    runtime: 'edge',
  },
}

export default config;
