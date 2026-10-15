import type { NextConfig } from "next";

const privateRouteHeaders = [
  { key: "Cache-Control", value: "private, no-store, max-age=0" },
  { key: "Referrer-Policy", value: "no-referrer" },
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive, nosnippet",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { headers: privateRouteHeaders, source: "/admin" },
      { headers: privateRouteHeaders, source: "/admin/:path*" },
      { headers: privateRouteHeaders, source: "/review/:path*" },
      { headers: privateRouteHeaders, source: "/api/reviews/:path*" },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/aida-public/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
