/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: process.env.strictMode || false,
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  }
}
