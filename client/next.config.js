/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // NEXT_PUBLIC_API_URL: 'http://localhost:5062/api/',
    NEXT_PUBLIC_API_URL: 'http://192.168.1.43:5062/api/',
    NEXT_PUBLIC_MEDIA_HOST:
      'https://dmzuqlhabiwwcasbtoem.supabase.co/storage/v1/object/public/',
  },
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
