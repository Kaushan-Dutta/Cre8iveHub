/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    web3storage: process.env.NEXT_WEB3_STORAGE,
  },
}

module.exports = nextConfig
