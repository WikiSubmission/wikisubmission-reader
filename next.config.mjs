/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'library.wikisubmission.org',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/dashboard/quran/search/:query*',
                destination: '/quran/:query*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
