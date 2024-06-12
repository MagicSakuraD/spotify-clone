/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pqjfvhcsjuqgmzfrpgvi.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
