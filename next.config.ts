import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // remotePatterns: [
  //   {
  //     protocol: "https",
  //     hostname: "ui-avatars.com",
  //   },
  // ],
};

export default nextConfig;
