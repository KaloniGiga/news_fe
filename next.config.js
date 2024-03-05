const withNextIntl = require("next-intl/plugin")("./i18n.ts");
/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/coverImage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
});

module.exports = nextConfig;
