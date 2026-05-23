import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
