/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, //If hosting on a free tier on vercel keep this disabled otherwise it can be enabled.
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
