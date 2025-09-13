// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: `@import "variables"; @import "mixins";`
  },
  // images: {
  //   domains: ['your-api-domain.com'], // 백엔드 도메인 추가
  // },
}

module.exports = nextConfig
