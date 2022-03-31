const withImages = require('next-images');

const devSecurityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
]

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
]


module.exports = withImages({
  env: {
    SECRET_COOKIE_PASSWORD: "2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8",
    NEXTAUTH_SECRET: "948a58f47388304112d35823c5625a42",
    NEXTAUTH_URL: "http://localhost:3000",
    SECRET: "948a58f47388304112d35823c5625a42",
    log: false,
    flags: {
        useNewHeader: false
    }
  },
  images: {
    disableStaticImages: true
  },
  inlineImageLimit: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: devSecurityHeaders,
      },
    ]
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
});
