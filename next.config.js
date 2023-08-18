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
};

module.exports = nextConfig;
