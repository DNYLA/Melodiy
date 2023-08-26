/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'dmzuqlhabiwwcasbtoem.supabase.co', //Host Upload
    ],
  },
  webpack: (config) => {
    config.externals.push({ 'react-native-fs': 'reactNativeFs' });

    return config;
  },
};

module.exports = nextConfig;
