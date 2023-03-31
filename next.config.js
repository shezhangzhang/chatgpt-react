/** @type {import('next').NextConfig} */
const withReactSvg = require("@svgr/webpack");
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
      config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"],
      });

      return config;
  },
};

module.exports = nextConfig;
