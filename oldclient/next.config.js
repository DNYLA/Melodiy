/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    webpackBuildWorker: true,
  },
  images: {
    domains: [
      'dmzuqlhabiwwcasbtoem.supabase.co', //Host Upload
      'svmigokmzkjddcixdmzh.supabase.co', //Host Upload
      'i.scdn.co',
    ],
  },
  webpack: (config) => {
    config.externals.push({ 'react-native-fs': 'reactNativeFs' });

    return config;
  },
};

module.exports = nextConfig;
