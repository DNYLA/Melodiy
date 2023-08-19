/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'upload.wikimedia.org', //Can Be Removed Soon
      'dmzuqlhabiwwcasbtoem.supabase.co', //Host Upload
      'robohash.org', //Sample Data
      'i.scdn.co', //Dev Value
    ],
  },
  webpack: (config, options) => {
    config.externals.push({ 'react-native-fs': 'reactNativeFs' });

    return config;
  },
};

module.exports = nextConfig;
