/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-projects-noeldev.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "d2nv4sjpynp88k.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
