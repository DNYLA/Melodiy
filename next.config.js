/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['upload.wikimedia.org', 'dmzuqlhabiwwcasbtoem.supabase.co'],
  },
};

module.exports = nextConfig;
