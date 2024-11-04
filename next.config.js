/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.demo.kqbd.ai',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.betiball.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'static.betiball.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localeDetection: false
  },
  experimental: {
    largePageDataBytes: 128 * 1000000
  }
}
