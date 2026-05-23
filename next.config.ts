import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/status", destination: "/projects", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hyxiao-blog-images.oss-cn-shenzhen.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "*.microlink.io",
      },
    ],
  },
};

export default nextConfig;
