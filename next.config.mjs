/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "library.wikisubmission.org",
      },
      {
        protocol: "https",
        hostname: "www.masjidtucson.org",
      },
    ],
    domains: ["picsum.photos"], // for testing
  },
  async redirects() {
    return [
      {
        source: "/dashboard/quran/search/:query*",
        destination: "/quran/:query*",
        permanent: true,
      },
      {
        source: "/dashboard/quran/:query*",
        destination: "/quran/:query*",
        permanent: true,
      },
      {
        source: "/dashboard/:query*",
        destination: "/quran/:query*",
        permanent: true,
      },
      {
        source: "/library/:path*",
        destination: "https://library.wikisubmission.org/:path*",
        permanent: true,
      },

      {
        source: "/appendix/0",
        destination:
          "https://library.wikisubmission.org/file/quran-the-final-testament-introduction",
        permanent: true,
      },
      ...Array.from({ length: 38 }, (_, i) => {
        const n = i + 1;
        return [
          {
            source: `/appendix/${n}`,
            destination: `https://library.wikisubmission.org/file/quran-the-final-testament-appendix-${n}`,
            permanent: true,
          },
          {
            source: `/appendix-${n}`,
            destination: `https://library.wikisubmission.org/file/quran-the-final-testament-appendix-${n}`,
            permanent: true,
          },
        ];
      }).flat(),
      // Fallback for invalid appendix numbers or /appendices
      {
        source: "/appendix/:path*",
        destination: "https://library.wikisubmission.org/file/quran-the-final-testament-appendices",
        permanent: true,
      },
      {
        source: "/appendix-:path(.*)",
        destination: "https://library.wikisubmission.org/file/quran-the-final-testament-appendices",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
