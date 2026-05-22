/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // bcryptjs uses native bindings — must stay in Node.js runtime, not Edge
    serverComponentsExternalPackages: ['bcryptjs'],
  },
}

module.exports = nextConfig
