/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

// Node 22+ exposes a broken `localStorage` global that crashes SSR code.
// Remove it so libraries use their normal browser-detection guards.
// @ts-ignore — globalThis.localStorage is not optional but we need to remove it
if ("localStorage" in globalThis) delete /** @type {any} */ (globalThis).localStorage;

import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "acropolis-realestate.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        // Convex file storage (property images served from Convex, not S3)
        protocol: "https",
        hostname: "*.convex.cloud",
        port: "",
        pathname: "/**",
      },
    ],
    // Optimize images
    unoptimized: true,
    // Configure image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Use modern formats
    formats: ["image/webp"],
    // Set minimum cache TTL
    minimumCacheTTL: 60,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase from 1MB to 10MB for large property data
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://*.s3.amazonaws.com https://*.s3.us-east-1.amazonaws.com https://*.s3.eu-west-1.amazonaws.com https://*.convex.cloud https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com https://i.ytimg.com",
              "font-src 'self' https://fonts.gstatic.com",
              "media-src 'self' https://*.s3.amazonaws.com https://*.s3.us-east-1.amazonaws.com https://*.s3.eu-west-1.amazonaws.com",
              "connect-src 'self' https://maps.googleapis.com https://*.s3.amazonaws.com https://*.s3.us-east-1.amazonaws.com https://*.s3.eu-west-1.amazonaws.com",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default config;
