/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    web3storage: process.env.NEXT_WEB3_STORAGE,
    database_id:process.env.NEXT_WEB3_Database_Id,
    collection_id:process.env.NEXT_WEB3_Collection_Id,
    project_id:process.env.NEXT_WEB3_Project_Id
  },
}

module.exports = nextConfig
