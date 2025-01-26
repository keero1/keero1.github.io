const nextConfig = {
  output: "export",
  experimental: {
    // You may not need this, it's just to support moduleResolution: 'node16'
    extensionAlias: {
      '.js': ['.tsx', '.ts', '.jsx', '.js'],
    },
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
};
module.exports = {
  images: {
    domains: ['http.cat'],
  },
}

export default nextConfig;
