/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.pokemondb.net", "cdn.traction.one"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
