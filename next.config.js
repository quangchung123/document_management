const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
  },
  sassOptions: {},
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
};
module.exports = nextConfig;
